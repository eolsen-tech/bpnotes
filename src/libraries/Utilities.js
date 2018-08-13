const bpnotesBaseURL = 'http://bpnotes-api.azurewebsites.net/api/';

export default {

  requestConfig : {
    httpPostActivityIdea: {
      baseURL : bpnotesBaseURL,
      url: '/HttpPOST-ActivityIdea',
      headers: {
        'Content-Type': 'application/json', 
        'x-functions-key': 'WkIj289PLWj7CCvqP6fta/PY3c0jGPYtqlbFwPhazgjOBCSyoU5PDg=='
      },
      responseType: 'json'
    },
    httpPutActivityIdea: {
      baseURL : bpnotesBaseURL,
      url: '/HttpPUT-ActivityIdea',
      headers: {
        'Content-Type': 'application/json', 
        'x-functions-key': 'IGaJ7F4aK9rky7a4h57hYVHgEXauw2CacjN11dWC2Sx5eyRhUSvolQ=='
      },
      responseType: 'json'
    },
    httpDeleteActivityIdea: {
      baseURL : bpnotesBaseURL,
      url: '/HttpDELETE-ActivityIdea',
      headers: {
        'Content-Type': 'application/json', 
        'x-functions-key': 'HW2v1LrrdKax7EM1tLl/xbFBXJ1aKqaxpeampBOYnLBxj5GxvywJcQ=='
      },
      responseType: 'json'
    },
    httpGetActivityIdea: {
      baseURL : bpnotesBaseURL,
      url: '/HttpGET-ActivityIdea/?type=Activities',
      headers: {
        'Content-Type': 'application/json', 
        'x-functions-key': 'pWGoR5ApB3woNEvMha/f91fwbbnyOCJp3tb0aKR1pf1K2iG3SaFs9A=='
      },
      responseType: 'json'
    }
  }

}