import redis

class ChapterManager:
    def __init__(self):
        self.r = redis.Redis(
            host='redis',
            port=6379,
            db=1,
            decode_responses=True,
            socket_connect_timeout=3
        )
        try:
            self.r.ping()
        except redis.ConnectionError:
            raise Exception("No se pudo conectar a Redis")

    def create_chapter(self, chapter_id, title, season):
        self.r.hset(f'chapter:{chapter_id}', mapping={
            'title': title,
            'season': str(season),
        })
        self.r.set(f'status:{chapter_id}', 'available')  # Estado inicial
        self.r.sadd('chapters', chapter_id)

    def get_status(self, chapter_id):
        if self.r.exists(f'rented:{chapter_id}'):
            return 'rented'
        elif self.r.exists(f'reserved:{chapter_id}'):
            return 'reserved'
        else:
            return 'available'

    def list_chapters(self):
        chapters = []
        for id in self.r.smembers('chapters'):
            chapter_data = self.r.hgetall(f'chapter:{id}')
            chapter_data['status'] = self.get_status(id)
            chapters.append(chapter_data)
        return chapters

    def reserve_chapter(self, chapter_id, user_id):
        if self.get_status(chapter_id) == 'available':
            self.r.setex(f'reserved:{chapter_id}', 240, user_id)  # TTL=4min
            return True
        return False

    def confirm_payment(self, chapter_id, price):
        if self.get_status(chapter_id) == 'reserved':
            self.r.delete(f'reserved:{chapter_id}')
            self.r.setex(f'rented:{chapter_id}', 400, price)  # TTL=24hs
            return True
        return False