from django.http import JsonResponse
from .redis_models import ChapterManager
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_POST

manager = ChapterManager()

@require_POST 
@csrf_exempt  
def reserve_chapter(request, chapter_id):
    user_id = request.POST.get('user_id', 'guest')
    if manager.reserve_chapter(chapter_id, user_id):
        return JsonResponse({
            'status': 'reserved',
            'user': user_id,
            'expires_in': 240
        })
    return JsonResponse({'error': 'No disponible'}, status=409)

def chapter_list(request):
    return JsonResponse({'chapters': manager.list_chapters()})

@require_POST
@csrf_exempt
def confirm_payment(request, chapter_id):
    price = request.POST.get('price')
    if manager.confirm_payment(chapter_id, price):
        return JsonResponse({'status': 'rented', 'hours': 24})
    return JsonResponse({'error': 'No se pudo confirmar'}, status=400)