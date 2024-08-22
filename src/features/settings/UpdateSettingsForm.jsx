import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  const [lastValue, setLastValue] = useState(null);

  function handleUpdateSetting(e) {
    console.log(e);
    if (lastValue === e.target.value) return;
    updateSetting({ [e.target.id]: e.target.value });
  }

  function handleFocus(e) {
    setLastValue(e.target.value);
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          onBlur={handleUpdateSetting}
          disabled={isUpdating}
          onFocus={handleFocus}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={handleUpdateSetting}
          disabled={isUpdating}
          onFocus={handleFocus}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          onBlur={handleUpdateSetting}
          disabled={isUpdating}
          onFocus={handleFocus}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={handleUpdateSetting}
          disabled={isUpdating}
          onFocus={handleFocus}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
