import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import CompanyTable from "@/components/partials/Table/company-table";
import profileImage from "../../assets/images/avatar/dummyImage.jpg";
import { getPosts, handleDeletePost } from "./store/postSlice";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useNavigate } from "react-router-dom";
import Axios from "../../services/api";
const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postData, isLoading } = useSelector((state) => state.postData);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
    // Axios.get("http://localhost:3000/api/report/list")
    //   .then((response) => {
    //     console.log(response.data.data);
    //     setData(response.data.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
    //console.log(postData);
  }, []);
  const COLUMNS = [
    {
      Header: "Profile Image",
      accessor: "profile",
      Cell: (row) => {
        const fileName = row?.cell?.value;
        //console.log(fileName);
        const imageUrl = fileName
          ? `http://localhost:3000/uploads/${fileName}`
          : profileImage;
        //console.log(imageUrl);
        return (
          <span className="flex items-center">
            <span className="w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
              <img
                src={imageUrl}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </span>
          </span>
        );
      },
    },
    {
      Header: "Title",
      accessor: "title",
      Cell: (row) => (
        <span className="flex items-center">
          <div className="flex-1 text-start">
            <h4 className="text-sm font-medium text-slate-600 whitespace-nowrap">
              {row?.cell?.value}
            </h4>
          </div>
        </span>
      ),
    },
    {
      Header: "Content",
      accessor: "content",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Author",
      accessor: "author",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: (row) => (
        <div>
          <div className="flex gap-4 divide-y divide-slate-100 dark:divide-slate-800">
            <div
              className="text-danger-600 bg-opacity-30 cursor-pointer hover:bg-opacity-100"
              onClick={() => deletepost(row?.cell?.value)}
            >
              <span className="text-base">
                <Icon icon={`heroicons-outline:trash`} />
              </span>
            </div>
            <div
              className="cursor-pointer dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
              onClick={() => navigate(`/edit-post/${row?.cell?.value}`)}
            >
              <span className="text-base">
                <Icon icon={`heroicons:pencil-square`} />
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const deletepost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      // background: darkMode ? "#1e293b" : "#fff",
      background: "#fff",
      confirmButtonColor: "#0783F6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await dispatch(handleDeletePost(id)).unwrap();
        if (response.data.success) {
          dispatch(getPosts());
        } else {
          toast.error(response.data.message);
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:col-span-8 col-span-12">
      <Card
        title="Posts"
        buttonTitle={"Add Post"}
        buttonLink={"/add-post"}
        noborder
      >
        <CompanyTable columns={COLUMNS} data={postData} />
      </Card>
      {/* <Card>
        {data.map((item) => (
          <>
            <p>{item.id}</p>
            <p>{item.name}</p>
          </>
        ))}
      </Card> */}
    </div>
  );
};

export default Posts;
