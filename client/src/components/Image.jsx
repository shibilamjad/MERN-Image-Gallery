import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import ButtonAdd from "./Button";
import Modal from "./Modal";

const API = "http://localhost:3005/api/images";

function Image() {
  const [addImage, setAddImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  function handleAdd(e) {
    const selectedFile = e.target.files[0];
    setAddImage(selectedFile);
    uploadImage(selectedFile);
    setProgress(0);
  }

  function handleClick(id) {
    const selectedIndex = images.findIndex((image) => image.id === id);
    setSelectedImageIndex(selectedIndex);
    setSelectedImageId(id);
  }

  function handleClose() {
    setSelectedImageId(null);
  }

  function handleNextImage() {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex((prev) => prev + 1);
      setSelectedImageId(images[selectedImageIndex + 1].id);
    }
  }

  function handlePrevImage() {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex((prevIndex) => prevIndex - 1);
      setSelectedImageId(images[selectedImageIndex - 1].id);
    }
  }

  async function uploadImage(image) {
    try {
      const formData = new FormData();
      formData.append("upload_file", image);

      const response = await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress);
        },
        onDownloadProgress: (progressEvent) => {
          const progress =
            50 + (progressEvent.loaded / progressEvent.total) * 50;
          console.log(progress);
          setProgress(progress);
        },
      });

      if (response.status === 200) {
        fetchImage();
      } else {
        console.error(`Image upload failed with status: ${response.status}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
      setProgress(0);
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  }

  async function fetchImage() {
    try {
      const res = await axios.get(API);
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  }
  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <ButtonAdd
        addImage={addImage}
        handleAdd={handleAdd}
        progress={progress}
      />

      <ul className="w-full h-full flex flex-wrap justify-center lg:px-20 md:px-15 sm:px-10 xl:px-36 2xxl:px-86">
        {images.map((image) => (
          <li
            key={image.id}
            className="m-5 p-4 w-[300px] h-[300px] text-gray-200 cursor-pointer"
          >
            <button onClick={() => handleClick(image.id)}>
              <img
                src={`http://localhost:3005/images/${image.fileName}`}
                alt={image.fileName}
                style={{
                  width: 300,
                  height: 300,
                  // objectFit: "fit",
                }}
              />
            </button>
          </li>
        ))}
        {selectedImageId && (
          <Modal handleClose={handleClose}>
            <StyledImg
              src={`http://localhost:3005/images/${
                images.find((image) => image.id === selectedImageId)?.fileName
              }`}
              alt="img"
            />
            <StyledButton>
              <Button
                disabled={selectedImageIndex === 0}
                onClick={handlePrevImage}
              >
                <FaChevronLeft />
              </Button>

              <Button
                disabled={selectedImageIndex === images.length - 1}
                onClick={handleNextImage}
              >
                <FaChevronRight />
              </Button>
            </StyledButton>
          </Modal>
        )}
      </ul>
    </>
  );
}

export default Image;

const StyledButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
  margin: 20px;
  font-size: 24px;
  padding: 15px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.5s;

  @media (max-width: 1240px) {
    font-size: 14px;
    padding: 10px;
    margin: 15px;
    transition: all 0.5s;
  }
  @media (max-width: 750px) {
    font-size: 12px;
    padding: 8px;
    margin: 7px;
    transition: all 0.5s;
  }
  @media (max-width: 450px) {
    font-size: 10px;
    padding: 6px;
    margin: 5px;
    transition: all 0.5s;
  }
  @media (max-width: 240px) {
    font-size: 8px;
    padding: 4px;
    margin: 3px;
    transition: all 0.5s;
  }
`;

const StyledImg = styled.img`
  width: 2000px;
  height: 800px;
  transition: all 0.5s;

  @media (max-width: 1540px) {
    width: 1000px;
    height: 600px;
    transition: all 0.5s;
  }
  @media (max-width: 1240px) {
    width: 900px;
    height: 400px;
    transition: all 0.5s;
  }
  @media (max-width: 750px) {
    width: 700px;
    height: 300px;
    transition: all 0.5s;
  }
  @media (max-width: 450px) {
    width: 500px;
    height: 150px;
    transition: all 0.5s;
  }
  @media (max-width: 240px) {
    width: 100px;
    height: 100px;
    transition: all 0.5s;
  }
`;
