import { useEffect, useState } from "react";
import axios from "axios";
import TableView from "../../components/HomePage/TableView";
import CreateHostedZoneModal from "../../components/HomePage/CreateHostedZoneModal";

const HomePage = () => {
  const [hostedZones, setHostedZones] = useState([]);
  useEffect(() => {
    const fetchHostedZones = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/list-hosted-zones"
        );
        setHostedZones(response.data);
        console.log(hostedZones);
      } catch (error) {
        console.error("Error fetching hosted zones:", error);
      }
    };
    fetchHostedZones();
  }, []);
  //--------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    CallerReference: "",
    Comment: "",
    PrivateZone: false,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/create-hosted-zone",
        formData
      );
      console.log("Response from backend:", response.data);

      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  //============================================
  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="m-3 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
        >
          Create Hosted Zone
        </button>
      </div>

      {isModalOpen && (
        <CreateHostedZoneModal
          onClose={closeModal}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        ></CreateHostedZoneModal>
      )}
      <TableView data={hostedZones} />
    </div>
  );
};

export default HomePage;
