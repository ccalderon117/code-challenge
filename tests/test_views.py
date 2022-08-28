import pytest
import requests

###Sorry if this is not what was being asked! This is my foray into python so pyI am certain I did not get this part right.###
#This method sends a requests to the API
def api_request(address_string):
    return requests.get('http://localhost:8000/api/parse/?csrfmiddlewaretoken=8cvhuDLNK2wPx7zFR9OnGgXD0hw8gTCnCrml2hkYxDLLwWRnqiC0fLKbDLPZxKER&address='+address_string)

def test_api_parse_succeeds(client):
    # TODO: Finish this test. Send a request to the API and confirm that the
    # data comes back in the appropriate format.

    address_string = '123 main st chicago il'
    #Sends API request and compares the expected response with the actual response
    x = api_request(address_string)
    data = x.json()
    fake_json ={'repeat': False, 'address_components': [['123', 'AddressNumber'], ['main', 'StreetName'], ['st', 'StreetNamePostType'], ['chicago', 'PlaceName'], ['il', 'StateName']], 'address_type': 'Street Address', 'input_string': '123 main st chicago il'}
    assert data == fake_json
    
def test_api_parse_raises_error(client):
    # TODO: Finish this test. The address_string below will raise a
    # RepeatedLabelError, so ParseAddress.parse() will not be able to parse it.
    address_string = '123 main st chicago il 123 main st chicago il'
    #Sends API request and compares the expected RepeatedLabelError response to the actual response 
    x = api_request(address_string)
    data = x.json()
    fake_json = {'repeat': True}
    assert data == fake_json
