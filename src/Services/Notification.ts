import {Notyf} from 'notyf'

export enum SccMsg{
    USER_ADDED = 'User added successfully',
    USERS_DOWNLOADED = 'All users are here!',
    USER_DELETED = 'User deleted successfully',
    USER_UPDATED = 'User deleted successfully', 
    COUPON_ADDED = 'Coupon added successfully',
    COUPONS_DOWNLOADED = 'All coupons are here!',
    COUPON_DELETED = 'Coupon deleted successfully',
    COUPON_UPDATED = 'Coupon deleted successfully',
    COMPANY_ADDED = 'Company added successfully',
    COMPANIES_DOWNLOADED = 'All companies are here!',
    COMPANY_DELETED = 'Company deleted successfully',
    COMPANY_UPDATED = 'Company updated successfully',
    PURCHASE_SUCCESS = 'Purchased successfully',
    CUSTOMER_ADDED = 'Registered successfully, please log in',
    
}
export enum ErrMsg{

}
class Notify{

    private notification = new Notyf({duration:2000, position:{x:"left",y:"bottom"}});
    public success(message: string){
        this.notification.success(message);
    }

    public error(err: any){
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    }

    private extractMsg(err: any): string{
        
				if(typeof err === 'string'){
            return err;
        }

        if(typeof err?.response?.data === 'string'){ //Backend exact error
            return err.response.data;
        }

        if(Array.isArray(err?.response?.data)){ // Backend exact error list
            return err?.response?.data[0];
        }

        
				// Must be last
        if(typeof err?.message === 'string'){
            return err.message;
        }


        return "An error occurred, please try again.";


    }
}
const notify = new Notify();
export default notify;