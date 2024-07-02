import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { ActionTypes } from "../lib/types";
import { EventContext } from "../lib/Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Inputs {
  id?: string;
  title: string;
  date: string;
  time: string;
  cover: string;
  type: string;
  composer: string;
}

interface CopyModalProps {
  open: boolean;
  handleClose: () => void;
  eventData: Inputs | null;
}

export const CopyModal: React.FC<CopyModalProps> = ({
  open,
  handleClose,
  eventData,
}) => {
  const { dispatch } = useContext(EventContext);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (eventData) {
      setValue("id", eventData.id);
      setValue("title", eventData.title);
      setValue("date", eventData.date);
      setValue("time", eventData.time);
      setValue("cover", eventData.cover);
      setValue("type", eventData.type);
      setValue("composer", eventData.composer);
    }
  }, [eventData, setValue]);

  const handleCopy: SubmitHandler<Inputs> = async (data) => {
    if (data.id) {
      const response = await axios.put(
        `http://localhost:3004/events/${data.id}`,
        data
      );
      dispatch({ type: ActionTypes.updateEvent, payload: response.data });
    }
    handleClose();
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(handleCopy)}>
          <input type="hidden" {...register("id")} />

          <Box my={2}>
            <TextField
              variant="outlined"
              label="Title"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Date"
              {...register("date", { required: "Date is required" })}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          </Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Time"
              {...register("time", { required: "Time is required" })}
              error={!!errors.time}
              helperText={errors.time?.message}
            />
          </Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Composer"
              {...register("composer", { required: "Composer is required" })}
              error={!!errors.composer}
              helperText={errors.composer?.message}
            />
          </Box>
          <Box my={2}>
            <Select
              sx={{ width: 200 }}
              {...register("type", { required: "Type is required" })}
              error={!!errors.type}
              defaultValue={eventData ? eventData.type : ""}
            >
              <MenuItem value="opera">Opera</MenuItem>
              <MenuItem value="ballet">Ballet</MenuItem>
            </Select>
          </Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              label="Cover"
              {...register("cover", { required: "Cover is required" })}
              error={!!errors.cover}
              helperText={errors.cover?.message}
            />
          </Box>
          <Button type="submit" variant="outlined">
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
