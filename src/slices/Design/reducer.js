import { createSlice, current } from "@reduxjs/toolkit";
import { getDesign, createDesign, removeDesign } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  designData: [],
  departments: [],
  design: [],
  alreadyExistsError: null,
  error: "",
  selectedIvrCampaignId: null,
  departmentNumbers: null,
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    changeIvrCampaign(state, action) {
      const selectedCampaign = state.designData.ivrCampaigns?.find(
        (campaign) => campaign.ivrCampaignName === action.payload
      );

      if (selectedCampaign) {
        state.selectedIvrCampaignId = selectedCampaign.id;

        const numbersOfIvrCamapaign = state.designData?.ivrCampaigns?.find(
          (campaign) => campaign.id === state.selectedIvrCampaignId
        );

        if (numbersOfIvrCamapaign && numbersOfIvrCamapaign.numbers) {
          state.numbers = numbersOfIvrCamapaign.numbers;

          const departments = numbersOfIvrCamapaign.numbers.map((number) => {
            return number.department;
          });

          const uniqueDepartments = departments.filter(
            (department, index, self) => index === self.indexOf(department)
          );

          state.departments = uniqueDepartments;
        } else {
          state.departments = [];
        }
      } else {
        state.selectedIvrCampaignId = null;
        state.departments = [];
      }
    },

    changeDepartment(state, action) {
      console.log(
        "results after changing department ->",
        current(state.designData)
      );

      const selectedCampaign = state.designData.ivrCampaigns.find(
        (campaign) => {
          return campaign.id === state.selectedIvrCampaignId;
        }
      );

      const numbers = selectedCampaign?.numbers
        .map((number) => {
          if (number.department === action.payload) {
            return { name: number.name, number: number.number };
          }
        })
        .filter((num) => num !== undefined);

      state.departmentNumbers = numbers;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDesign.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.designData = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(createDesign.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        state.alreadyExistsError = null;
        state.error = "";

        const newItem = action.payload.data; // Assuming action.payload.data contains the new item returned from the backend

        const parentId = newItem.parentId; // Assuming the parent ID is included in the new item

        // Check if designs array exists in designData
        if (state.designData.designs) {
          // If parentId is null, push the new item directly into designs array
          if (parentId === null) {
            state.designData.designs.push(newItem);
          } else {
            // Find the parent item
            const findParent = (items) => {
              for (let i = 0; i < items?.length; i++) {
                if (items[i].id === parentId) {
                  return items[i];
                } else if (items[i].items?.length > 0) {
                  const parent = findParent(items[i].items);
                  if (parent) return parent;
                }
              }
              return null;
            };

            // Find the parent
            const parent = findParent(state.designData.designs);

            // If parent is found
            if (parent) {
              if (parent.items === null) {
                parent.items = [];
              }
              parent.items.push(newItem);

              toast.success("IVR Design has been added !", {
                position: "bottom-center",
                autoClose: 3000,
                theme: "colored",
              });
            } else {
              console.log("Parent not found!");
            }
          }
        } else {
          console.log("Designs array not found!");
        }
      }
    });

    builder.addCase(removeDesign.fulfilled, (state, action) => {
      state.error = "";

      const deletedItemId = action.payload.data.deletedParent.id;

      state.designData = {
        ...state.designData,
        designs: state.designData.designs.map((design) => {
          const updatedItems = removeItemFromDesign(
            design.items,
            deletedItemId
          );
          return { ...design, items: updatedItems };
        }),
      };

      toast.error("Design has been removed!", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

function removeItemFromDesign(items, deleteId) {
  return items
    .map((item) => {
      // If the current item's ID matches the deleteId, remove it
      if (item.id === deleteId) {
        return null; // returning null will filter out this item
      }

      // If the current item has child items, recursively remove from them
      if (item.items && item.items.length !== 0) {
        const updatedChildItems = removeItemFromDesign(item.items, deleteId);
        return { ...item, items: updatedChildItems };
      }

      return item; // if not deleted, return the item as is
    })
    .filter(Boolean); // filter out null items (deleted items)
}

export default designSlice.reducer;
export const { changeIvrCampaign, changeDepartment } = designSlice.actions;
