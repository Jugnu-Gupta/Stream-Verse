import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import makeApiRequest, { makeApiMediaRequest } from '../../../utils/MakeApiRequest';
import { PersonalInfoValidationSchema } from './PersonalInfoValidationSchema';
import { ChannelInfoType } from '../../../Types/Channel.type';
import { twMerge } from 'tailwind-merge';
import { ErrorType } from '../../../Types/Error.type';
import { ResponseType } from '../../../Types/Response.type';

interface PersonalInfoFormProps {
    channelInfo: ChannelInfoType | undefined;
    newCoverImg: File | null;
    newAvatar: File | null;
    discardAvatarChange: () => void;
    discardCoverImgChange: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> =
    ({ channelInfo, newCoverImg, newAvatar, discardCoverImgChange, discardAvatarChange }) => {
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
                    if (values.fullName === channelInfo?.fullName &&
                        values.userName === channelInfo?.userName) return;

                    makeApiRequest({
                        method: "patch",
                        url: "/api/v1/users/me",
                        data: {
                            _id: channelInfo?._id,
                            fullName: values.fullName,
                            userName: values.userName,
                        },
                    }).then((response) => {
                        const data = (response as ResponseType).data;

                        toast.success("Changes updated successfully");
                        localStorage.setItem("userName", data.user.userName);
                        localStorage.setItem("fullName", data.user.fullName);
                    }).catch((error: ErrorType) => {
                        console.error(error.response.data.message);
                        if (error.response.data.statusCode === 409) {
                            toast.error("User name already exists");
                            setAvailableUserName(error.response.data.data?.availableUserName);
                        } else {
                            toast.error(error.response.data.message);
                        }
                    });
                    resetForm({ values });
                },
            });

        const updateImage = (url: string, image: File, fileName: string) => {
            const data = new FormData();
            data.append("image", image);
            makeApiMediaRequest({
                method: "patch",
                url,
                data
            }).then(() => {
                toast.success(`${fileName} updated successfully`);
                window.location.reload();
            }).catch((error: ErrorType) => {
                console.error(error.response.data.message);
            });
        }

        const handleImgChange = () => {
            if (newCoverImg) {
                updateImage("/api/v1/users/cover-image", newCoverImg, "Cover Image");
            }
            if (newAvatar) {
                updateImage("/api/v1/users/avatar", newAvatar, "Avatar");
            }
        }

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
                className="w-full text-white border-2 border-primary-border rounded-xl py-2">
                <div className="px-2 mb-3 text-sm text-primary-text">
                    <label htmlFor="fullName">
                        Full name
                    </label>
                    <input type="text"
                        name="fullName"
                        id="fullName"
                        value={values.fullName}
                        placeholder="Full name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s]
				    placeholder:text-primary-text2 text-primary-text text-sm border-2 border-primary-border outline-none"
                    />
                    {touched.fullName && errors.fullName ? <p className="text-start text-xs mt-0.5">{errors.fullName}</p> : null}
                </div>
                <div className='px-2 mb-3 text-sm text-primary-text'>
                    <label htmlFor="userName">
                        User name
                    </label>
                    <input type="text"
                        name="userName"
                        id="userName"
                        value={values.userName}
                        placeholder="User name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s] text-primary-text
				    placeholder:text-primary-text2 placeholder:text-sm border-2 border-primary-border outline-none"
                    />
                    {availableUserName !== "" ? <p className="text-start text-xs mt-0.5">Available user name is '{availableUserName}'</p> :
                        touched.userName && errors.userName ? <p className="text-start text-xs mt-0.5">{errors.userName}</p> : null
                    }
                </div>
                <div className='px-2 mb-3 text-sm text-primary-text'>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email"
                        name="email"
                        id="email"
                        value={channelInfo?.email}
                        className="px-2 py-1 mt-1 w-full rounded-md bg-background-secondary transition delay-[50000s] text-primary-text
				    placeholder:text-primary-text2 placeholder:text-sm border-2 border-primary-border outline-none"/>
                </div>
                <div className='w-full border-y border-primary-border' />

                <div className='flex justify-end px-2 pt-3 text-sm text-nowrap'>
                    <button type="button" onClick={() => { discardCoverImgChange(); discardAvatarChange() }}
                        className="px-3 py-1 mb-1 mr-4 tracking-wide font-medium 
                    text-primary-text rounded-md outline-none border-2 border-primary-border">
                        Cancel
                    </button>
                    <button type="submit" onClick={handleImgChange}
                        className={twMerge(["px-3 py-1 mb-1 tracking-wide font-semibold border-2 border-primary-border",
                            "rounded-md bg-background-secondary outline-none text-primary-text",
                            values.fullName === channelInfo?.fullName && values.userName === channelInfo?.userName
                            && newCoverImg === null && newAvatar === null && "opacity-75"])}>
                        Save changes
                    </button>
                </div>
            </form>
        );
    };


export default PersonalInfoForm;