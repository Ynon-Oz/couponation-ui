import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import globals from "../../../Services/Globals";


import "./AddCompany.css";




function AddCompany(): JSX.Element {

    const {register, handleSubmit, formState: { errors }} = useForm<CompanyModel>();
    const history = useHistory();
    
    async function send(cat:CompanyModel) {
        console.log(cat);
        try{
            const formData = new FormData();
            formData.append("name",cat.name);
            formData.append("weight",cat.weight.toString());
            formData.append("color",cat.color);
            formData.append("birthday",cat.birthday.toString());
            formData.append("image",cat.image.item(0));
            const response = await axios.post<CompanyModel>(globals.urls.companies,formData);
            const added = response.data;
            alert('cat has been added');
            history.push('/')
        }
        catch (err) {
            console.log(err.message);
        }
    }


    return (
        <div className="AddCompany">
			
            <form onSubmit={handleSubmit(send)}>
                <label>Name</label> <br/>
                <input type="text" name="name" 
                {...register("name",{
                    required: true, 
                    minLength:2})}/>
                    {/* pattern: /^[A-Z].*$/ */}
                <br/>
                {/* {errors.name && errors.name.type==='required' && <span>missing name</span>}
                {errors.name && errors.name.type==='minLength' && <span>name is too short</span>} */}
                {errors.companyName?.type==='required' && <span>missing name</span>}
                {errors.companyName?.type==='minLength' && <span>name is too short</span>}
              
               <br/> <br/>

                <label>Weight</label> <br/>
                <input type="number" name="weight" step="0.01" {...register("weight",{
                    required: {
                        value:true,
                        message:'Missing Weight'},
                    min:{
                        value:0,
                        message:'Weight must be greater than zero'}
                })}/>
                <br />
                <span>{errors.weight?.message}</span>
                <br/> <br/>

                <label>Color</label> <br/>
                <input type="text" name="color" 
                {...register("color",{required:true} )}/>
             
                <br/>
                {errors.color && <span>missing color</span>}
                <br/> <br/>

                <label>Birthday</label> <br/>
                <input type="date" name="birthday" {...register("birthday",{required: true})}/>
                <br/>
                {errors.birthday && <span>missing birthday</span>}
                <br/> <br/>
                
                <label>Image</label> <br/>
                <input type="file" name="image" accept="image/*" {...register("image",{required: true})} />
                <br/>
                {errors.image && <span>missing image</span>}
                <br/> <br/>

                <button>Add</button>
                
            </form>

        </div>
    );
}

export default AddCompany;
