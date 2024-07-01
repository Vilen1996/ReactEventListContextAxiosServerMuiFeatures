import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useState, useContext } from "react";
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
  title: string;
  date: string;
  time: string;
  cover: string;
  type: string;
  composer: string;
}

export const AddEvent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { dispatch } = useContext(EventContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleAdd: SubmitHandler<Inputs> = async (data) => {
    const response = await axios.post("http://localhost:3004/events", data);
    dispatch({ type: ActionTypes.addEvent, payload: response.data });
    setOpen(false);
    reset();
  };

  return (
    <Box my={2}>
      <Button onClick={() => setOpen(true)} variant="contained">
        add
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(handleAdd)}>
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
              submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};
