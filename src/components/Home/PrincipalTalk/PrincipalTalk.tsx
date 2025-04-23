import Image from "next/image";

const PrincipalTalk = () => {
    const g = "Principal's Talk"
    return (
        <div className=" mx-5 md:mx-5 lg:mx-10 flex flex-col-reverse md:flex-col-reverse lg:flex-row justify-between items-center">
            <div className="w-full md:full lg:w-1/2">
                <p className="text-slate-500">{g}</p>
                <h3 className="text-2xl font-semibold my-3">EDUCATION IS THE MOST POWERFUL WEAPON</h3>
                <p className="text-slate-500 ">Welcome to Duaria Abdul Gufoor Model Academy, where we believe in nurturing minds, inspiring innovation, and shaping the leaders of tomorrow. At our institution, education goes beyond the classroom—we focus on developing character, critical thinking, and a lifelong passion for learning. Every student who walks through our doors becomes part of a vibrant community committed to academic excellence and holistic growth.</p>
                <Image className="mb-3 mt-10" height={60} width={120} src="https://i.ibb.co/d2zy7mh/signature.png" alt="" />
                <p className="font-bold text-lg">Abu Salim Bhuiya</p>
                <p className="text-slate-500">Principal DAGMA</p>
            </div>
            <div className="w-full md:w-full lg:w-1/2 flex justify-center items-center">
                <Image height={200} width={400} src='https://res.cloudinary.com/durkh1c9d/image/upload/v1745403854/New_Project_7_dhpno2.png' alt="principal sir photo" />
                {/* <Image className="absolute top-0 left-0 w-full object-cover mix-blend-multiply pointer-events-none h-full" height={200} width={300} src='https://res.cloudinary.com/durkh1c9d/image/upload/v1745401850/381371745_b8ae8da6-3157-4b18-af6e-39bca4e79aff_xeyg8l.png' alt="principal sir photo"/> */}
            </div>
        </div>
    );
};

export default PrincipalTalk;