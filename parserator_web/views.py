
import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import ParseError


class Home(TemplateView):
    template_name = 'parserator_web/index.html'
    print("check")



class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        # TODO: Flesh out this method to parse an address string using the
        # parse() method and return the parsed components to the frontend.
        input_string = request.GET['address']
        parsed = AddressParse.parse(self, input_string)

        print("check")

        if parsed[0] == bool(False):
            repeat = parsed[0]
            address_components = parsed[1]
            address_type = parsed[2]
            return Response({
                "repeat": repeat,
                "address_components":address_components,
                "address_type":address_type,
                "input_string":input_string,
            })
        if parsed[0]== bool(True):
            repeat = parsed[0]
            return Response({
                "repeat":repeat,

            })


    def parse(self, address):
        # TODO: Implement this method to return the parsed components of a
        # given address using usaddress: https://github.com/datamade/usaddress
        try:
            repeat = bool(False)
            address_components = usaddress.parse(address)
            print(address_components)
            address_type = usaddress.tag(address)[1]
            return repeat, address_components, address_type
        except usaddress.RepeatedLabelError as e :
            repeat = bool(True)
            return [repeat]