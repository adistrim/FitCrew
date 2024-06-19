"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        height: '',
        weight: '',
        bloodGroup: '',
        gender: '',
        age: '',
        password: '',
        confirmPassword: '',
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.user.token);
                router.push('/');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error registering user');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
                            </div>
                            <button type="button" onClick={() => setStep(2)} className="w-full bg-blue-500 text-white py-2 rounded-md">Next</button>
                            <div className="mt-4 text-center">
                                <p className="text-gray-700">Already have an account? <Link href="/login"><span className="text-blue-500">Login</span></Link></p>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">Height</label>
                                <input type="text" name="height" value={formData.height} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Weight</label>
                                <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Blood Group</label>
                                <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Gender</label>
                                <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
                            </div>
                            <button type="button" onClick={() => setStep(1)} className="w-full bg-gray-500 text-white py-2 rounded-md mb-2">Previous</button>
                            <button type="button" onClick={() => setStep(3)} className="w-full bg-blue-500 text-white py-2 rounded-md">Next</button>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Confirm Password</label>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
                            </div>
                            <button type="button" onClick={() => setStep(2)} className="w-full bg-gray-500 text-white py-2 rounded-md mb-2">Previous</button>
                            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">Submit</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
