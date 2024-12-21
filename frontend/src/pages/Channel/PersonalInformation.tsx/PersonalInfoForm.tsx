import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import makeApiRequest from '../../../utils/MakeApiRequest';
import { PersonalInfoValidationSchema } from './PersonalInfoValidationSchema';
import { ChannelInfoType } from '../../../Types/Channel';

interface PersonalInfoFormProps {
    channelInfo: ChannelInfoType | undefined;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ channelInfo }) => {
    const [availableUserName, setAvailableUserName] = React.useState<string>("");
    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } =
        useFormik({
            initialValues: {
                _id: "",
                fullName: "",
                userName: "",
            },
            validationSchema: PersonalInfoValidationSchema,
            onSubmit: async (values) => {
                makeApiRequest({
                    method: "patch",
                    url: "/api/v1/users/me",
                    data: {
                        _id: channelInfo?._id,
                        fullName: values.fullName,
                        userName: values.userName,
                    },
                }).then((response: any) => { // eslint-disable-line
                    const responseData = response.data;
                    toast.success("Changes updated successfully");
                    localStorage.setItem("userName", responseData.user.userName);
                    localStorage.setItem("fullName", responseData.user.fullName);
                }).catch((error) => {
                    console.error(error.response.data.message);
                    console.error(error);
                    if (error.response.data.statusCode === 409) {
                        toast.error("User name already exists");
                        setAvailableUserName(error.response.data.data.availableUserName);
                    } else {
                        toast.error(error.response.data.message);
                    }
                });
                resetForm({ values });
            },
        });

    useEffect(() => {
        if (channelInfo) {
            resetForm({
                values: {
                    _id: channelInfo._id,
                    fullName: channelInfo?.fullName,
                    userName: channelInfo?.userName,
                }
            });
        }
    }, [channelInfo, resetForm]);

    return (
        <form onSubmit={handleSubmit}
            className="w-full text-white border-2 border-white rounded-xl py-2">
            <div className="px-2 mb-3 text-sm">
                <label htmlFor="fullName">
                    Full name
                </label>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={values.fullName}
                    placeholder="Full name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s]
				    placeholder:text-gray-300 text-sm border-[1px] border-white outline-none"
                />
                {touched.fullName && errors.fullName ? <p className="text-start text-xs mt-0.5">{errors.fullName}</p> : null}
            </div>
            <div className='px-2 mb-3 text-sm'>
                <label htmlFor="userName">
                    User name
                </label>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={values.userName}
                    placeholder="User name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s]
				    placeholder:text-gray-300 placeholder:text-sm border-[1px] border-white outline-none"
                />
                {availableUserName !== "" ? <p className="text-start text-xs mt-0.5">Available user name is '{availableUserName}'</p> :
                    touched.userName && errors.userName ? <p className="text-start text-xs mt-0.5">{errors.userName}</p> : null
                }
            </div>
            <div className='px-2 mb-3 text-sm'>
                <label htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={channelInfo?.email}
                    className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s]
				    placeholder:text-gray-300 placeholder:text-sm border-[1px] border-white outline-none"
                />
            </div>
            <div className='w-full h-[1px] text-white bg-white' />

            <div className='flex justify-end px-2 pt-3 text-sm text-nowrap'>
                <button type="button"
                    className="px-3 py-1 mb-1 mr-4 tracking-wide font-medium 
                    text-white rounded-md outline-none border-[1px] border-white">
                    Cancel
                </button>
                <button type="submit"
                    className="px-3 py-1 mb-1 tracking-wide font-semibold 
                    text-white rounded-md bg-primary outline-none">
                    Save changes
                </button>
            </div>
        </form>
    );
};


export default PersonalInfoForm;