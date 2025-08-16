import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
    updateMyProfile, 
    uploadDisplayPicture, 
    uploadFullImage,
    requestVerificationOtp,
    confirmVerificationOtp 
} from '../../../client/src/services/apiService';
import { Edit, Save, XCircle, User, Briefcase, Star, MessageSquare, Phone, Mail, CheckCircle, AlertTriangle, Award, Building, Sparkles } from 'lucide-react';

// --- Reusable Component for Verifiable Inputs ---
const VerifiableInput = ({ field, label, type, initialValue, onVerificationChange, onVerificationSuccess }) => {
    const [value, setValue] = useState(initialValue);
    const [isChanged, setIsChanged] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const changed = value !== initialValue;
        setIsChanged(changed);
        const newVerificationStatus = !changed;
        setIsVerified(newVerificationStatus);
        onVerificationChange(newVerificationStatus);
    }, [value, initialValue, onVerificationChange]);

    const handleRequestOtp = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await requestVerificationOtp(field, value);
            setMessage(res.data.msg);
            setOtpSent(true);
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOtp = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await confirmVerificationOtp(otp);
            setMessage('Successfully verified!');
            setIsVerified(true);
            onVerificationChange(true);
            setOtpSent(false);
            onVerificationSuccess(res.data.updatedField);
        } catch (err) {
            setError(err.response?.data?.msg || 'Confirmation failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1 flex items-center gap-2">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {isChanged && !isVerified && !otpSent && (
                    <button type="button" onClick={handleRequestOtp} disabled={loading} className="px-3 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600 disabled:bg-yellow-300">
                        {loading ? 'Sending...' : 'Verify'}
                    </button>
                )}
                {isVerified && (
                    <span className="text-green-600 flex items-center"><CheckCircle size={20}/></span>
                )}
            </div>
            {otpSent && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                    <p className="text-sm text-gray-600 mb-2">{message}</p>
                    <div className="flex items-center gap-2">
                         <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            maxLength="6"
                            onChange={(e) => setOtp(e.target.value)}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                         <button type="button" onClick={handleConfirmOtp} disabled={loading} className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 disabled:bg-green-400">
                            {loading ? 'Verifying...' : 'Confirm'}
                        </button>
                    </div>
                </div>
            )}
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
    );
};


// --- Main Page Component ---
const EditProfilePage = () => {
    const { user, setUser } = useOutletContext();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [initialData, setInitialData] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [verifications, setVerifications] = useState({ email: true });

    const setInitialStates = useCallback((currentUser) => {
        if (currentUser && currentUser.contractorProfile) {
            const initial = {
                name: currentUser.contractorProfile.name || '',
                role: currentUser.role || '',
                description: currentUser.contractorProfile.description || '',
                quotes: currentUser.contractorProfile.quotes || '',
                skills: currentUser.contractorProfile.skills || [],
                contact: {
                    num: currentUser.phone || '',
                    email: currentUser.email || '',
                },
                companyRole: currentUser.contractorProfile.companyRole || '',
                specializations: currentUser.contractorProfile.specializations || [],
                certifications: currentUser.contractorProfile.certifications || [],
                dpimageurl: currentUser.contractorProfile.dpimageurl || '',
                fullimageurl: currentUser.contractorProfile.fullimageurl || '',
            };
            setProfileData(initial);
            setInitialData(initial);
        }
    }, []);

    useEffect(() => {
        setInitialStates(user);
    }, [user, setInitialStates]);

    const showFeedback = (setter, text) => {
        setter(text);
        setTimeout(() => setter(''), 4000);
    };
    
    const handleVerificationChange = (field, isVerified) => {
        setVerifications(prev => ({ ...prev, [field]: isVerified }));
    };

    const handleVerificationSuccess = ({ field, value }) => {
        setUser(prevUser => {
            const updatedUser = { ...prevUser, [field]: value };
            setInitialStates(updatedUser);
            return updatedUser;
        });
    };

    const handleSave = async () => {
        setError('');
        setMessage('');
        try {
            const { contact, role, ...contractorData } = profileData;
            const res = await updateMyProfile(contractorData);
            
            if (setUser) {
                setUser(prevUser => ({
                    ...prevUser,
                    contractorProfile: res.data
                }));
            }
            
            showFeedback(setMessage, 'Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            showFeedback(setError, err.response?.data?.msg || 'Failed to update profile.');
        }
    };
    const handleCancel = () => {
        setProfileData(initialData);
        setVerifications({ email: true });
        setIsEditing(false);
    };

    const isSaveDisabled = !verifications.email;

    if (!profileData) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    <User className="mr-3"/> My Public Profile
                </h1>
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center transition shadow-sm hover:shadow-md">
                        <Edit size={16} className="mr-2"/> Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-4">
                        <button onClick={handleCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 flex items-center transition">
                            <XCircle size={16} className="mr-2"/> Cancel
                        </button>
                        <button onClick={handleSave} disabled={isSaveDisabled} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 flex items-center transition shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                            <Save size={16} className="mr-2"/> Save Changes
                        </button>
                    </div>
                )}
            </div>
            
            {isSaveDisabled && isEditing && (
                 <div className="mb-4 text-center text-yellow-800 bg-yellow-100 p-3 rounded-md flex items-center justify-center gap-2">
                    <AlertTriangle size={18} /> Please verify your new email address before saving.
                 </div>
            )}
            {message && <div className="mb-4 text-center text-green-800 bg-green-100 p-3 rounded-md">{message}</div>}
            {error && <div className="mb-4 text-center text-red-800 bg-red-100 p-3 rounded-md">{error}</div>}

            {isEditing ? (
                <ProfileForm 
                    profileData={profileData} 
                    setProfileData={setProfileData}
                    initialData={initialData}
                    onVerificationChange={handleVerificationChange}
                    onVerificationSuccess={handleVerificationSuccess}
                />
            ) : (
                <ProfileDisplay profileData={profileData} />
            )}
        </div>
    );
};


// --- Display Component (Read-Only View) ---
const ProfileDisplay = ({ profileData }) => {
    const DisplayField = ({ label, value, icon, children }) => (
        <div>
            <h3 className="text-sm font-semibold text-gray-500 flex items-center">{icon}{label}</h3>
            {children ? <div className="mt-1">{children}</div> : <p className="mt-1 text-lg text-gray-900 capitalize">{value || 'Not set'}</p>}
        </div>
    );

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
                 <img src={profileData.dpimageurl} alt="Profile" className="w-40 h-40 rounded-full object-cover mx-auto shadow-lg border-4 border-white" />
                 <img src={profileData.fullimageurl} alt="Profile" className="w-full rounded-lg object-cover shadow-lg border-4 border-white" />
            </div>
            <div className="md:col-span-2 space-y-6">
                <DisplayField label="Full Name" value={profileData.name} icon={<User size={14} className="mr-2"/>} />
                <DisplayField label="System Role" value={profileData.role} icon={<Briefcase size={14} className="mr-2"/>} />
                <DisplayField label="Company Title" value={profileData.companyRole} icon={<Building size={14} className="mr-2"/>}/>
                <DisplayField label="Description" value={profileData.description} icon={<MessageSquare size={14} className="mr-2"/>}/>
                <DisplayField label="Quote" value={`"${profileData.quotes}"`} icon={<MessageSquare size={14} className="mr-2"/>} />
                <DisplayField label="Contact Phone" value={profileData.contact.num} icon={<Phone size={14} className="mr-2"/>} />
                <DisplayField label="Contact Email" value={profileData.contact.email} icon={<Mail size={14} className="mr-2"/>} />
                <DisplayField label="Skills" icon={<Star size={14} className="mr-2"/>}>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.skills.map(skill => <span key={skill} className="bg-gray-200 text-sm rounded-full px-3 py-1">{skill}</span>)}
                    </div>
                </DisplayField>
                <DisplayField label="Specializations" icon={<Sparkles size={14} className="mr-2"/>}>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.specializations.map(spec => <span key={spec} className="bg-blue-100 text-blue-800 text-sm rounded-full px-3 py-1">{spec}</span>)}
                    </div>
                </DisplayField>
                <DisplayField label="Certifications" icon={<Award size={14} className="mr-2"/>}>
                    <ul className="list-disc list-inside mt-2 text-gray-800">
                        {profileData.certifications && profileData.certifications.map(cert => <li key={cert.name}>{cert.name} ({cert.authority}, {cert.year})</li>)}
                    </ul>
                </DisplayField>
            </div>
        </div>
    );
};

// --- Form Component (Edit View) ---
const ProfileForm = ({ profileData, setProfileData, initialData, onVerificationChange, onVerificationSuccess }) => {
    const [skillInput, setSkillInput] = useState('');
    const [specInput, setSpecInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, contact: { ...prev.contact, [name]: value } }));
    };

    const handleTagKeyDown = (e, tagType, currentInput, setInput) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = currentInput.trim();
            if (newTag && !profileData[tagType].includes(newTag)) {
                setProfileData(prev => ({ ...prev, [tagType]: [...prev[tagType], newTag] }));
            }
            setInput('');
        }
    };
    
    const removeTag = (tagToRemove, tagType) => {
        setProfileData(prev => ({ ...prev, [tagType]: prev[tagType].filter(tag => tag !== tagToRemove)}));
    };

    const handleImageUpload = async (e, imageType) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        const apiFunction = imageType === 'dp' ? uploadDisplayPicture : uploadFullImage;
        const fieldName = imageType === 'dp' ? 'dpimage' : 'fullimage';
        const urlField = imageType === 'dp' ? 'dpimageurl' : 'fullimageurl';
        
        formData.append(fieldName, file);
        try {
            const res = await apiFunction(formData);
            setProfileData(prev => ({ ...prev, [urlField]: res.data[urlField] }));
        } catch (error) {
            alert('Image upload failed. Please try again.');
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-8">
            {/* Section 1: Identity & Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 border rounded-lg bg-gray-50/50">
                <div className="md:col-span-1">
                    <h3 className="font-bold text-lg mb-4">Profile Images</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Display Picture (DP)</label>
                            <img src={profileData.dpimageurl} alt="DP" className="w-24 h-24 rounded-full object-cover my-2 shadow-sm border"/>
                            <input type="file" onChange={(e) => handleImageUpload(e, 'dp')} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Image</label>
                            <img src={profileData.fullimageurl} alt="Full" className="w-full h-24 object-cover rounded-md my-2 shadow-sm border"/>
                            <input type="file" onChange={(e) => handleImageUpload(e, 'full')} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"/>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 space-y-6">
                     <h3 className="font-bold text-lg mb-4">Core Information</h3>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" value={profileData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">System Role (Admin Controlled)</label>
                        <input type="text" value={profileData.role} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed capitalize"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Title (e.g. Founder)</label>
                        <input type="text" name="companyRole" value={profileData.companyRole} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>
            </div>

            {/* Section 2: Contact Info */}
            <div className="p-4 border rounded-lg bg-gray-50/50">
                 <h3 className="font-bold text-lg mb-4">Contact Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <VerifiableInput
                        field="email"
                        label="Contact Email"
                        type="email"
                        initialValue={initialData.contact.email}
                        onVerificationChange={(isVerified) => onVerificationChange('email', isVerified)}
                        onVerificationSuccess={onVerificationSuccess}
                    />
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                        <input type="tel" name="num" value={profileData.contact.num} onChange={handleContactChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    </div>
                 </div>
            </div>

            {/* Section 3: Bio & Skills */}
            <div className="p-4 border rounded-lg bg-gray-50/50">
                 <h3 className="font-bold text-lg mb-4">Professional Details</h3>
                 <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description / Bio</label>
                        <textarea name="description" value={profileData.description} onChange={handleChange} rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Inspirational Quote</label>
                        <input type="text" name="quotes" value={profileData.quotes} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <div className="mt-1 flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md">
                             {profileData.skills.map(skill => (
                                <div key={skill} className="flex items-center gap-1 bg-gray-200 text-sm rounded-full px-3 py-1">
                                    <span>{skill}</span>
                                    <button type="button" onClick={() => removeTag(skill, 'skills')} className="font-bold hover:text-red-500">&times;</button>
                                </div>
                            ))}
                            <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => handleTagKeyDown(e, 'skills', skillInput, setSkillInput)} placeholder="Add skill & press Enter..." className="flex-grow bg-transparent outline-none p-1"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Specializations</label>
                        <div className="mt-1 flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md">
                            {profileData.specializations.map(spec => (
                                <div key={spec} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm rounded-full px-3 py-1">
                                    <span>{spec}</span>
                                    <button type="button" onClick={() => removeTag(spec, 'specializations')} className="font-bold hover:text-red-500">&times;</button>
                                </div>
                            ))}
                            <input type="text" value={specInput} onChange={(e) => setSpecInput(e.target.value)} onKeyDown={(e) => handleTagKeyDown(e, 'specializations', specInput, setSpecInput)} placeholder="Add specialization & press Enter..." className="flex-grow bg-transparent outline-none p-1"/>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
