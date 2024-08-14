import axios from "axios";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";
import ViewPhotoModal from "../ViewPhotoModal";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useMemo, useCallback, useState, useEffect, forwardRef } from "react";

import DefaultURL from "../../utils/DefaultURL";

const PhotoInput = forwardRef(({ post }, ref) => {
  const [photo, setPhoto] = useState(null);
  const [viewPhotoData, setViewPhotoData] = useState(null);
  const [viewPhotoVisible, setViewPhotoVisible] = useState(false);

  //   useEffect(() => {
  //     if (article) {
  //       const fetchCurrentPost = async () => {
  //         try {
  //           const responseArticle = await axios.get(
  //             `${DefaultURL}/article/${post.id}`
  //           );

  //           if (responseArticle.data.photo.length !== 0) {
  //             const reponseArticlePhotos = await axios.get(
  //               `${DefaultURL}/article/get-article-photos/${article.id}`
  //             );

  //             const photos = reponseArticlePhotos?.data.map((photo) => {
  //               const byteString = atob(photo.bytes);
  //               const byteArray = new Uint8Array(byteString.length);
  //               for (let i = 0; i < byteString.length; i++) {
  //                 byteArray[i] = byteString.charCodeAt(i);
  //               }

  //               const imageUrl = `data:image/jpeg;base64,${photo.bytes}`;

  //               return {
  //                 data: photo.articlePhoto,
  //                 preview: imageUrl,
  //                 posted: true,
  //                 isThumbnail: photo.articlePhoto.thumbnail,
  //               };
  //             });

  //             setPhotos(photos);
  //           } else {
  //             setPhotos([]);
  //           }
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       };

  //       fetchCurrentPost();
  //     }
  //   }, [post, reload]);

  //   const viewImage = (index) => {
  //     setViewPhotoData(photos[index]);
  //     setViewPhotoVisible(true);
  //   };

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#fee466",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#2596be",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2596be",
  };

  const acceptStyle = {
    borderColor: "#2596be",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const onDrop = useCallback(
    (file) => {
      const id = toast.loading("Please Wait A Little Bit...");
      const droppedFile = file[0];

      if (droppedFile.type.substring(0, 6) === "image/") {
        toast.update(id, {
          render: "The Image Was Successfully Droped!",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });

        const image = new Image();

        image.onload = function () {
          const photoPrev = URL.createObjectURL(droppedFile);
          setViewPhotoData(photoPrev);

          setPhoto({
            data: droppedFile,
            preview: photoPrev,
            posted: false,
            isThumbnail: false,
          });
        };

        image.src = URL.createObjectURL(droppedFile);
      } else {
        toast.update(id, {
          render: "The File You Tried To Drop Is Not An Image! Try Again!",
          type: "error",
          autoClose: 3000,
          isLoading: false,
          transition: Bounce,
        });
      }
    },
    [photo]
  );

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      cursor: "pointer",
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    if (ref) {
      ref.current = photo;
    }
  }, [ref, photo]);

  const deleteImage = (e) => {
    e.preventDefault();

    setPhoto(null);
  };

  return (
    <>
      {viewPhotoVisible ? (
        <ViewPhotoModal
          photoData={viewPhotoData}
          onClose={() => setViewPhotoVisible(false)}
        />
      ) : null}

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="container mt-4">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p className="mb-0">Select An Image For This Post</p>
        </div>
        <div className="row">
          {photo === null ? (
            <h3 className="mt-3" style={{ color: "#2596be" }}>
              No Photo Selected
            </h3>
          ) : (
            <div className="mt-4 mb-4">
              <img
                src={photo.preview}
                className="img-fluid border border-3 border-primary-subtle"
                style={{
                  maxWidth: "250px",
                  maxHeight: "250px",
                }}
                alt="Preview Image"
              />
              <br />
              <div className="mt-2">
                <button
                  className="btn btn-outline-success ml-2 mx-1"
                  onClick={() => setViewPhotoVisible(true)}
                >
                  View
                </button>

                <button
                  className="btn btn-outline-danger ml-2 mx-1"
                  onClick={(e) => deleteImage(e)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default PhotoInput;
