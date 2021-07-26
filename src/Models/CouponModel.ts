import CompanyModel from "./CompanyModel";

class CouponModel {
    public id?: number;
    public companyId?: number;
    public company?: CompanyModel;
    public title?: string;
    public amount?: number;
    public price?: number;
    public description?: string;
    public startDate?: Date;
    public endDate?: Date;
    public type?: string;
    public image?: string;
}

export default CouponModel;