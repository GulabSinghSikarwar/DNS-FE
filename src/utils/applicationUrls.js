import { url } from "./constant";

class ApplicationUrls {

    hostedZoneUrl = url + '/hosted-zones'
    authUrl = url + '/auth'

    get loginUrl() {
        return this.authUrl + '/login'
    }

    get signupUrl() {
        return this.authUrl + '/register'
    }

    get validateToken() {
        return this.authUrl + '/validateToken'
    }

    get hostedZones() {
        return this.hostedZoneUrl + '/'
    }
    hostedZoneRecords(id){
        return this.hostedZoneUrl+`/${id}/records`
    }


}
export const applicationUrls = new ApplicationUrls();