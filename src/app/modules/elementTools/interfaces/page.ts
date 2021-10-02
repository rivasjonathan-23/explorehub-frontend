import { PageDocuments } from "src/app/service-provider/page-legality-validation/page-legality-validation.component";

export interface Page {
    _id:string;
    status: string;
    creator: any;
    pageType: string;
    hostTouristSpot: string;
    components: any[];
    services: any[];
    otherServices: any[];
    bookingInfo:any[];
    createdAt: any,
    initialStatus: string;
    pageDocuments?: PageDocuments
}
