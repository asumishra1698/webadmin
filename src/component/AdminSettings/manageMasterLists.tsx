import React, { useState, useEffect, useMemo } from "react";
import { Plus, X, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import Layout from "../../reuseable/Layout";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import MasterListForm from "./masterListForm";
import Swal from "sweetalert2";

import {
  getReferenceDataRequest,
  addReferenceDataItemRequest,
  removeReferenceDataItemRequest,
  updateReferenceDataItemRequest,
} from "../../redux/actions/referenceActions";
import type { RootState } from "../../redux/reducers/rootReducers";
import Modal from "../../reuseable/modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ListItem = {
  id: string;
  name: string;
  color?: string;
  icon?: string;
};

type MasterList = {
  title: string;
  items: ListItem[];
};

const ManageMasterLists: React.FC = () => {
  const dispatch = useDispatch();
  const {
    data: referenceData,
    loading,
    error,
  } = useSelector((state: RootState) => state.referenceData);

  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListTitle, setSelectedListTitle] = useState<string | null>(
    null
  );
  const [editItem, setEditItem] = useState<{
    category: string;
    item: ListItem;
  } | null>(null);

  const [isAddMasterListModalOpen, setIsAddMasterListModalOpen] =
    useState(false);

  useEffect(() => {
    setIsMounted(true);
    dispatch(getReferenceDataRequest());
  }, [dispatch]);

  const actualData =
    referenceData && referenceData.data && Array.isArray(referenceData.data)
      ? referenceData.data
      : [];

  const masterLists: MasterList[] = actualData.map((categoryObj: any) => ({
    title: categoryObj.category,
    items: Array.isArray(categoryObj.items)
      ? categoryObj.items.map((item: any) => ({
          id: item._id,
          name: item.name,
          color: item.metadata?.color,
          icon: item.metadata?.icon,
        }))
      : [],
  }));

  const handleRemoveItem = (_listTitle: string, itemId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item from the master list?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DA0808",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeReferenceDataItemRequest(itemId));
      }
    });
  };

  const handleAddItem = (listTitle: string) => {
    setSelectedListTitle(listTitle);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedListTitle(null);
  };

  const handleCreateItem = (newItem: FormData) => {
    if (editItem) {
      dispatch(
        updateReferenceDataItemRequest(
          editItem.item.id,
          editItem.category,
          newItem
        )
      );
    } else if (selectedListTitle) {
      dispatch(addReferenceDataItemRequest(newItem));
    }
    setIsModalOpen(false);
    setSelectedListTitle(null);
    setEditItem(null);
  };

  const handleEditItem = (listTitle: string, item: ListItem) => {
    setSelectedListTitle(listTitle);
    setEditItem({ category: listTitle, item });
    setIsModalOpen(true);
  };

  const [newMasterCategory, setNewMasterCategory] = useState("");
  const handleAddNewMasterList = () => {
    setIsAddMasterListModalOpen(true);
    setNewMasterCategory("");
  };

  const handleAddMasterListModalClose = () => {
    setIsAddMasterListModalOpen(false);
    setNewMasterCategory("");
  };

  const handleCreateNewMasterList = (formData: FormData) => {
    dispatch(addReferenceDataItemRequest(formData));
    setIsAddMasterListModalOpen(false);
    setNewMasterCategory("");
  };

  const actionButtons = useMemo(
    () => (
      <>
        <button
          onClick={handleAddNewMasterList}
          className="flex items-center px-4 py-2.5 bg-[#FFE5E5] text-[#DA0808] rounded-xl hover:bg-red-600 hover:text-white transition-colors font-medium border border-red-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Master List
        </button>
      </>
    ),
    []
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: "absolute", bottom: "0px" }}>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 rounded-full bg-gray-300 transition-colors"></div>
    ),
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Layout
      title="Manage Master Lists"
      subtitle="Set up dropdown lists like Role Types, Status Types, and more for user selections."
      showBackButton={true}
      backButtonLink="/admin-settings"
      actionButtons={actionButtons}
      isHeaderFixed={true}
      searchPlaceholder="Search by Name, Phone Number, or Email"
      searchValue={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
    >
      <div className="p-6 overflow-x-hidden responsive-container w-full mx-auto">
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : error ? (
          <div className="text-center p-4 text-red-600">
            <h3 className="text-lg font-medium">Failed to load Master Lists</h3>
            Error: {error}
          </div>
        ) : (
          <>
            <style>{`
          .slick-dots li.slick-active div {
            background-color: #DA0808 !important;
          }          
          .slick-slide > div {
            padding: 0 8px;
          }          
          .slick-list {
            margin: 0 -8px;
          }
          .responsive-container {
            max-width: 1280px;
            margin: 0 auto;
          }                  
            .custom-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
            width: 40px;
            height: 40px;
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .custom-arrow:hover {
            background: #DA0808;
            border-color: #DA0808;
            color: white;
            box-shadow: 0 4px 12px rgba(218, 8, 8, 0.3);
          }
          .custom-arrow.prev {
            left: -20px;
          }
          .custom-arrow.next {
            right: -20px;
          }
          .custom-arrow:before {
            content: '';
          }
          @media (max-width: 768px) {
            .custom-arrow {
              width: 35px;
              height: 35px;
            }
            .custom-arrow.prev {
              left: -15px;
            }
            .custom-arrow.next {
              right: -15px;
            }
          }
          @media (max-width: 480px) {
            .custom-arrow {
              width: 30px;
              height: 30px;
            }
            .custom-arrow.prev {
              left: -10px;
            }
            .custom-arrow.next {
              right: -10px;
            }
          }
        `}</style>
            {isMounted && (
              <Slider {...sliderSettings}>
                {masterLists.map((list) => (
                  <div key={list.title} className="pb-10">
                    <div className="bg-white rounded-lg shadow-md flex flex-col h-full w-full">
                      <div className="flex items-center justify-between mb-4 bg-gray-800 text-white p-3 rounded-t-lg">
                        <h3 className="font-semibold">{list.title}</h3>
                        <button
                          onClick={() => handleAddItem(list.title)}
                          className="p-1 bg-white text-gray-800 rounded-full hover:bg-gray-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="px-4 pb-4 flex-grow flex flex-col h-[450px]">
                        <div className="flex-grow space-y-2">
                          {list.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between bg-gray-100 px-2 py-1.5 rounded-md text-sm"
                            >
                              <span className="text-gray-800">{item.name}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleEditItem(list.title, item)
                                  }
                                  className="text-gray-500 hover:text-blue-500"
                                  title="Edit"
                                >
                                  <Pencil className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleRemoveItem(list.title, item.id)
                                  }
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </>
        )}
      </div>

      {/* Modal for adding/editing item to existing master list */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2 className="text-lg font-semibold mb-4">
          {editItem
            ? `Edit Item in "${editItem.category}"`
            : `Add New Item to "${selectedListTitle}"`}
        </h2>
        <MasterListForm
          category={selectedListTitle || ""}
          onCreate={handleCreateItem}
          onCancel={handleModalClose}
          initialValues={editItem?.item}
        />
      </Modal>

      {/* Modal for adding new master list (category) */}
      <Modal
        isOpen={isAddMasterListModalOpen}
        onClose={handleAddMasterListModalClose}
      >
        <h2 className="text-lg font-semibold mb-4">Add New Master List</h2>
        <MasterListForm
          category={newMasterCategory}
          onCreate={handleCreateNewMasterList}
          onCancel={handleAddMasterListModalClose}
        />
      </Modal>
    </Layout>
  );
};

const CustomPrevArrow: React.FC<any> = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    <ChevronLeft className="h-5 w-5" />
  </div>
);

const CustomNextArrow: React.FC<any> = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    <ChevronRight className="h-5 w-5" />
  </div>
);

export default ManageMasterLists;