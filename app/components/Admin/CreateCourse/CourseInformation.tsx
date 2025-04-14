import { useGetLayoutQuery } from "@/Redux/Feature/Layout/LayoutApi";
import React, { useEffect, useState } from "react";

interface Props {
  courseInfo: any;
  active: number;
  setActive: (active: number) => void;
  setCourseInfo: any;
}
const CourseInformation: React.FC<Props> = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetLayoutQuery("category", {
    refetchOnMountOrArgChange: true,
  });

  const [category, setCategory] = useState([]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  // ---Handle-Files-Change------
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (ee) => {
        if (reader.readyState == 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // -------Handle-Image-Drag----
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (ee) => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (data) {
      setCategory(data?.layout?.category);
    }
  }, [data]);
  return (
    <div className="w-[80%] mx-auto mt-24">
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="coursename">
            Course Name
          </label>
          <input
            type="text"
            required
            className="input-box"
            id="coursename"
            placeholder="Enter Course Name"
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
          />
        </div>
        <br />
        <div className="">
          {" "}
          <label className="label" htmlFor="description">
            Course description
          </label>
          <textarea
            cols={30}
            rows={8}
            required
            className="input-box !py-2 "
            name=""
            id="description"
            placeholder="Write Course description"
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="price" className="label">
              Course Price
            </label>
            <input
              type="number"
              className="input-box"
              required
              id="price"
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="Enter Course Price"
            />
          </div>{" "}
          <div className="w-[45%]">
            <label htmlFor="estimatePrice" className="label">
              Estimate Price (optional)
            </label>
            <input
              type="number"
              className="input-box"
              id="estimatePrice"
              value={courseInfo.estimatePrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatePrice: e.target.value })
              }
              placeholder="Enter Course estimate Price "
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="tags" className="label">
              Course Tags
            </label>
            <input
              type="text"
              className="input-box"
              required
              id="tags"
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="Enter Course Tags"
            />
          </div>{" "}
          <div className="w-[45%]">
            <label htmlFor="category" className="label">
              Course Category
            </label>
            <select
              required
              value={courseInfo.category}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
              className="input-box"
              id="category"
            >
              <option disabled>Select Category</option>
              {category.map((item: any) => {
                return (
                  <option key={item._id} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="level" className="label">
              Course level
            </label>
            <select
              required
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className="input-box"
              id="level"
            >
              <option defaultValue={`beginner`} value="beginner">
                Beginner
              </option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>{" "}
          <div className="w-[45%]">
            <label htmlFor="demoUrl" className="label">
              Demo Url
            </label>
            <input
              type="text"
              className="input-box"
              required
              id="demoUrl"
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="Enter Demo Url "
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDragDrop}
            htmlFor="file"
            className={`w-full min-h[10vh] cursor-pointer dark:border-white border-[#00000026] p-3 border flex items-center justify-center  ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            {courseInfo?.thumbnail ? (
              <img
                src={courseInfo?.thumbnail}
                className="min-h-full w-full object-cover"
              />
            ) : (
              <span className="dark:text-white text-black">
                Darg and Drop Your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full justify-end items-center flex">
          <button
            type="submit"
            className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
          >
            Next
          </button>
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
