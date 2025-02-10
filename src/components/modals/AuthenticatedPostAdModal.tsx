import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { 
  ssr: false 
});



// Define a type for the form data
interface AdFormData {
  title: string;
  description: string;
  location?: string;
  price: number;
  jobCategory?: string;
  serviceType?: string;
  rentalPeriod?: string;
  houseType: "rental" | "sale";
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  houseRentalCapacity: string;
  isFurnished?: boolean;
  houseCondition?: string;
  landSize?: string;
  ownershipDocuments?: string;
  images: File[];
}



const PostAdModal =  ({
  isOpen,
  onClose,
  isAuthenticated,
  userRoles,
}: {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  userRoles: string[]
}) => {
  const [step, setStep] = useState<"select" | "form">("select");
  const [adType, setAdType] = useState<"house" | "job" | "service" | null>(null);
  const [houseType, setHouseType] = useState<"rental" | "sale" | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imageDescriptions, setImageDescriptions] = useState<string[]>([]);
  const editor = useRef(null);  // Create a ref for the Jodit editor
  const [description, setDescription] = useState<string>('');
  const router = useRouter();


  // Determine allowed ad types based on roles
  const canPostHouse = userRoles.includes("landlord");
  const canPostJob = userRoles.includes("employer");
  const canPostService = userRoles.includes("serviceProvider");

  
  const isFreeUser = isAuthenticated && userRoles.length === 1 && userRoles.includes("user");

  // Handle the selection of post type
  const handleSelectPostType = (type: "house" | "job" | "service") => {
    setAdType(type);
    setStep("form"); // Move to the form step
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  // Handle image description input change
const handleImageDescriptionChange = (index: number, description: string) => {
  const newDescriptions = [...imageDescriptions];
  newDescriptions[index] = description;
  setImageDescriptions(newDescriptions);
};

  const handleRemoveImage = (index: number) => {
    // Remove the selected image from the list
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  
    // Reset the input field when an image is removed
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) input.value = ''; // This resets the file input field
  };

   const handleHouseTypeChange = (type: "rental" | "sale") => {
    setHouseType(type);
  };


  // Handle form submission
  const handleFormSubmit = (data: AdFormData) => {
  //logic for form submit
  console.log("Ad posted:", { ...data, images });
    onClose();
  };

  // Redirect to pricing page for upgrading
  const handlePricingRedirect = () => {
    onClose();  // Close the modal
    router.push("/pricing"); // Redirect to pricing page
  };

  // Handle description change
  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div
        className={`relative bg-pivotaLightGray max-w-3xl w-full mx-4 p-12 rounded-lg shadow-lg bg-cover bg-center max-h-[90vh] overflow-y-auto `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4">
          <button className="text-pivotaTeal text-2xl focus:outline-none" onClick={onClose}>
            &times;
          </button>
        </div>

        {isFreeUser ? (
      <div className="bg-yellow-500 text-black p-4 rounded-lg mb-4 flex items-center justify-between shadow-lg flex-wrap sm:flex-nowrap">
      <div className="flex items-center mb-4 sm:mb-0">
        <Image src="/premium-users.png" alt="Premium Logo" width={50} height={50} className="mr-2" />
        <span className="font-semibold">PREMIUM:</span>
        <span className="ml-2 text-sm sm:text-base">Posting an ad is available only for premium users.</span>
      </div>
      
      <button
        className="bg-pivotaTeal text-white px-6 py-3 rounded-lg hover:scale-105 transition duration-300"
        onClick={handlePricingRedirect} 
      >
        Upgrade
      </button>
    </div>
    
        
        ): step === "select" ? (
          <div className="space-y-6">

             {/* White horizontal line before the title */}
                 <hr className="border-t border-white my-4" />
            <h2 className="md: text-3xl font-semibold text-pivotaTeal text-center">
              Hi, What would you like to post?
            </h2>

            {canPostHouse &&
            <button
              className="w-full bg-pivotaGold text-black px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectPostType("house")}
            >
              Post a House
            </button>
             }

             {canPostJob && 
            <button
              className="w-full bg-pivotaGold text-black px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectPostType("job")}
            >
              Post a Job
            </button>
              }

              {canPostService && 
            <button
              className="w-full bg-pivotaGold text-black px-6 py-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectPostType("service")}
            >
              Post a Service
            </button>

              }

            <div className="text-center mt-4">
              <button
                className="bg-pivotaCoral text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              className="text-sm text-black hover:text-pivotaGold mb-4"
              onClick={() => setStep("select")}
            >
              &larr; Back
            </button>

            <h2 className="text-3xl font-semibold text-black hover:text-pivotaGold text-center">
              {adType === "house"
                ? "Post Your House"
                : adType === "job"
                ? "Post Your Job"
                : "Post Your Service"}
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black">Title</label>
                <input
                  type="text"
                  className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                  placeholder="Enter the title of your post"
                  required
                />
              </div>

              <div>
                  <label className="block text-sm font-medium text-black">Description</label>
                <JoditEditor
                  ref={editor}
                  value={description}
                  config={{
                    readonly: false,
                    placeholder: "Describe your listing...",
                  }}
                  onBlur={newContent => handleDescriptionChange} // preferred to use only this option to update the content for performance reasons
			            onChange={newContent => {}}
                />
              </div>

              {adType === "house" && (
                <>
                <div>
                  <label className="block text-sm font-medium text-black">Select Type</label>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseType" value="rental" onChange={() => handleHouseTypeChange("rental")} /> Rental
                  </label>
                  <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseType" value="sale" onChange={() => handleHouseTypeChange("sale")} /> For Sale
                  </label>
                </div>
            

              <div>
                <label className="block text-sm font-medium text-black">Location</label>
                <input type="text" className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black" placeholder="Enter the location" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">House Condition</label>
                <input type="text" className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black" placeholder="e.g. New, Renovated, Needs Repair" required />
              </div>
             

              {houseType === "rental" && (
                <div>
                <div>
                <label className="block text-sm font-medium text-black mb-3 mt-4">Select Rental Duration</label>
                <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseRentalCapacity" value="3 Bedrooms"/> Monthly
                </label>
                <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseRentalCapacity" value="3 Bedrooms"/> Yearly
                </label>
                <label className="block text-sm font-medium text-black mt-4">Amount (KSH)</label>
                    <input
                      type="number"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter Amount"
                      required
                    />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-3 mt-4">Select Capacity</label>
                </div>

                  <div className="flex-col gap-4">
                  <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseRentalCapacity" value="Single"/> Single
                  </label>
                  <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseRentalCapacity" value="Bed Sitter"/> Bed Sitter
                  </label>
                  <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseRentalCapacity" value="1 Bedroom"/> 1 Bedroom
                  </label>
                  <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseRentalCapacity" value="2 Bedrooms"/> 2 Bedrooms
                  </label>
                  <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseRentalCapacity" value="3 Bedrooms"/> 3 Bedrooms
                  </label>
                  <label className="flex items-center gap-2 text-black">
                    <input type="radio" name="houseRentalCapacity" value="4 Bedrooms"/> 4 Bedrooms
                  </label>
                  </div>
                </div>
            
              )}

              {houseType === "sale" && (
                <div>
                   <div>
                <label className="block text-sm font-medium text-black">Number of Bedrooms</label>
                <input type="number" className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white" placeholder="Enter number of bedrooms" required />
              </div>
                  <label className="block text-sm font-medium text-black mt-3">Land Size</label>
                  <input type="text" className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black" placeholder="Enter land size" required />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-black">Upload Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black"
                />
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  {images.map((image, index) => (
                    <div key={index} className="w-1/4 p-2">
                      <div className="relative w-full h-40 mb-2">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="House Image"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-2xl"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        >
                          &times;
                        </button>
                      </div>

                      {/* Description input for each image */}
                      <label className="block text-sm font-medium text-black">Description</label>
                      <textarea
                        className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                        placeholder="E.g, Sitting Room, Bed Room"
                        required
                        rows={4} // Ensure a minimum height for the input
                      />
                    </div>
                  ))}
                </div>
              </div>

              </>
                
              )}

              {adType === "job" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black">Job Category</label>
                    <input
                      type="text"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter job category"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">Salary</label>
                    <input
                      type="number"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter the salary"
                      required
                    />
                  </div>
                </>
              )}

              {adType === "service" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black">Service Type</label>
                    <input
                      type="text"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-black placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter service type"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">Price</label>
                    <input
                      type="number"
                      className="w-full p-4 border border-pivotaTeal rounded-md bg-transparent text-white placeholder-gray-400 focus:ring-pivotaAqua focus:border-pivotaAqua"
                      placeholder="Enter the price"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="bg-pivotaCoral text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  onClick={() => handleFormSubmit({
                    title: "", description: "", price: 0,
                    images: [],
                    houseType: "rental",
                    houseRentalCapacity: ""
                  })}
                  className="bg-pivotaGold text-black px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostAdModal;
