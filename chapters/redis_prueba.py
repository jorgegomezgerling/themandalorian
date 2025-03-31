import redis

class ChapterManager:
    def __init__(self):
        # Configuración explícita de la conexión Redis
        self.r = redis.Redis(
            host='redis',
            port=6379,
            db=1,
            decode_responses=True,  # Convierte bytes a str automáticamente
            socket_connect_timeout=3  # Timeout para conexión
        )
        # Verifica la conexión
        try:
            self.r.ping()
        except redis.ConnectionError:
            raise Exception("No se pudo conectar a Redis")

    def create_chapter(self, chapter_id, title, season, available=True):
        self.r.hset(f'chapter:{chapter_id}', mapping={
            'title': title,
            'season': str(season),
            'available': str(available)
        })
        self.r.sadd('chapters', chapter_id)

    def get_chapter(self, chapter_id):
        return self.r.hgetall(f'chapter:{chapter_id}')
    
    def list_chapters(self):
        return [self.r.hgetall(f'chapter:{id}') for id in self.r.smembers('chapters')]
    
    def is_available(self, chapter_id):
        self.check_availability(chapter_id)
        return self.r.hget(f'chapter:{chapter_id}', 'available') == "True"  
    
    def reserve_chapter(self, chapter_id, user_id):
        if self.is_available(chapter_id):
            self.r.setex(f"reserved:{chapter_id}", 20, user_id)
            self.r.hset(f'chapter:{chapter_id}', 'available', "False")

            self.r.set(f'reservation_expiry:{chapter_id}', "pending")
            self.r.expire(f'reservation_expiry:{chapter_id}', 20)
            return True
        return False

    def check_availability(self, chapter_id):
        if self.r.exists(f'reserved:{chapter_id}'):
            self.r.hset(f'chapter:{chapter_id}', 'available', "False")
            return False
    # Si no hay reserva y available es False, lo cambiamos a True
        if self.r.hget(f'chapter:{chapter_id}', 'available') == 'False':
            self.r.hset(f'chapter:{chapter_id}', 'available', "True")
    
        return self.r.hget(f'chapter:{chapter_id}', 'available') == "True"
