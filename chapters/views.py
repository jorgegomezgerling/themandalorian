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
    try:
        price = request.GET.get('price')  # Cambiado a GET por el uso de params
        user_id = request.GET.get('user_id', 'guest')
        
        if not price:
            return JsonResponse({"error": "Falta el parámetro price"}, status=400)
            
        # Convertir a float
        price_float = float(price)
        
        if manager.confirm_payment(chapter_id, price_float):
            return JsonResponse({"status": "rented", "hours": 24})
        return JsonResponse({"error": "No se pudo confirmar el pago"}, status=400)
        
    except ValueError:
        return JsonResponse({"error": "Precio debe ser un número"}, status=400)
    except Exception as e:
        print("Error interno:", str(e))  # Log para debugging
        return JsonResponse({"error": "Error interno del servidor"}, status=500)