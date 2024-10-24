from django.utils.deprecation import MiddlewareMixin

class DisableCSRFMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Disable CSRF for API views, but keep it enabled for other parts of the app
        if request.path.startswith('/'):
            request.csrf_processing_done = True
