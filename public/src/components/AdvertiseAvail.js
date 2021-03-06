import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import { API_HOST } from "../consts";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment-timezone";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export default function AdvertiseAvail(props) {
  const { open, onClose } = props;
  const user = useSelector(selectUser);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [petType, setPetType] = useState("");
  const [price, setPrice] = useState("");
  const onAdvertise = async () => {
    try {
      const avail = {
        username: user.username,
        pet_type: petType,
        advertised_price: price,
        start_date: start,
        end_date: end,
      };
      const response = await fetch(`${API_HOST}/caretakers/avail`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(avail),
      });
      const result = await response.json();
      if (result.status !== "success") {
        alert("Advertise new availability failed!");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      onClose();
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Advertise Availability</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please indicate the period of time your will be available as well as
          the pet type and price.
        </DialogContentText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            variant="inline"
            format="yyyy-MM-dd"
            fullWidth
            minDate={new Date()}
            maxDate={moment().add(2, "years").toDate()}
            value={start}
            label="Start Date"
            onChange={(date) => setStart(date)}
          />
          <KeyboardDatePicker
            variant="inline"
            format="yyyy-MM-dd"
            fullWidth
            minDate={start}
            maxDate={moment().add(2, "years").toDate()}
            value={end}
            label="End Date"
            onChange={(date) => setEnd(date)}
          />
        </MuiPickersUtilsProvider>
        {/* <TextField
          fullWidth
          type="text"
          label="Pet Type"
          onChange={(e) => setPetType(e.target.value)}
        /> */}
        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          color="secondary"
        >
          <InputLabel id="select-pet-type">Select pet type</InputLabel>
          <Select
            label="Select pet type"
            fullWidth
            labelId="select-pet-type"
            id="select-pet-type"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          >
            <MenuItem value={"Cat"}>Cat</MenuItem>
            <MenuItem value={"Dog"}>Dog</MenuItem>
            <MenuItem value={"Hamster"}>Hamster</MenuItem>
            <MenuItem value={"Terrapin"}>Terrapin</MenuItem>
            <MenuItem value={"Bird"}>Bird</MenuItem>
            <MenuItem value={"Rabbit"}>Rabbit</MenuItem>
            <MenuItem value={"Fish"}>Fish</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label="Price (Dollars)"
          onChange={(e) => setPrice(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onAdvertise} color="secondary">
          Advertise
        </Button>
      </DialogActions>
    </Dialog>
  );
}
