from django.core.management.base import BaseCommand
from chapters.redis_models import ChapterManager

class Command(BaseCommand):
    help = 'Popula Redis con capítulos de prueba'

    def handle(self, *args, **options):
        manager = ChapterManager()      

        chapters = [
            {'id': 1, 'title': 'Chapter 1: The Mandalorian', 'season': 1},
            {'id': 2, 'title': 'Chapter 2: The Child', 'season': 1},
            {'id': 3, 'title': 'Chapter 3: The Sin', 'season': 1},
            {'id': 4, 'title': 'Chapter 4: Sanctuary', 'season': 1},
            {'id': 5, 'title': 'Chapter 5: The Gunsliger', 'season': 1},
            {'id': 6, 'title': 'Chapter 6: The Prisioner', 'season': 1},
            {'id': 7, 'title': 'Chapter 7: The Reckoning', 'season': 1},
            {'id': 8, 'title': 'Chapter 8: Redemption', 'season': 1},
            {'id': 9, 'title': 'Chapter 9: The Marshal', 'season': 2},
            {'id': 10, 'title': 'Chapter 10: The Passenger', 'season': 2},
            {'id': 11, 'title': 'Chapter 11: The Heiress', 'season': 2},
            {'id': 12, 'title': 'Chapter 12: The Siege', 'season': 2},
            {'id': 13, 'title': 'Chapter 13: The Jedi', 'season': 2},
            {'id': 14, 'title': 'Chapter 14: The Tragedy', 'season': 2},
            {'id': 15, 'title': 'Chapter 15: The Believer', 'season': 2},
            {'id': 16, 'title': 'Chapter 16: The Rescue', 'season': 2},
            {'id': 17, 'title': 'Chapter 17: The Apostate', 'season': 3},
            {'id': 18, 'title': 'Chapter 18: The Mines of Mandalore', 'season': 3},
            {'id': 19, 'title': 'Chapter 19: The Convert', 'season': 3},
            {'id': 20, 'title': 'Chapter 20: The Foundling', 'season': 3},
            {'id': 21, 'title': 'Chapter 21: The Pirate', 'season': 3},
            {'id': 22, 'title': 'Chapter 22: Guns for Hire', 'season': 3},
            {'id': 23, 'title': 'Chapter 23: The Spies', 'season': 3},
            {'id': 24, 'title': 'Chapter 24: The Return', 'season': 3},
        ]

        for chapter in chapters:
            manager.create_chapter(
                chapter_id=chapter['id'],
                title=chapter['title'],
                season=chapter['season'],  
            )

        self.stdout.write(self.style.SUCCESS('¡Capítulos agregados correctamente!'))


                