import {
  Autocomplete,
  Box, Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import ErrorHandler from "../errorHandler/ErrorHandler";
// import SelectCity from "./SelectCity.bak-tsx";
// import SelectLocation from "./SelectLocation";

const RenderFormInput = React.forwardRef((props, ref) => {
  const {name, label, errors, elementProps, controllerField} = props;
  if (props.inputType === "text") {
    return (
      <TextField
        name={name}
        label={label}
        ref={ref}
        error={Boolean(errors?.[name]?.message)}
        helperText={errors?.[name]?.message}
        {...controllerField}
        {...elementProps}
        fullWidth
        size="small"
      />
    );
  }
  if (props.inputType === "textarea") {
    return (
      <TextField
        name={name}
        label={label}
        ref={ref}
        error={Boolean(errors?.[name]?.message)}
        helperText={errors?.[name]?.message}
        {...controllerField}
        {...elementProps}
        fullWidth
        size="small"
      />
    );
  }
  // if (props.inputType === "password") {
  //   return (
  //     <PasswordInput
  //       name={name}
  //       label={label}
  //       inputRef={ref}
  //       errors={errors?.[name]?.message}
  //       controllerField={controllerField}
  //       elementProps={elementProps}
  //     />
  //   );
  // }
  // if (props.inputType === "date") {
  //   const {setValue, watch} = props;
  //   return (
  //     <CustomDatePicker
  //       name={name}
  //       label={label}
  //       inputRef={ref}
  //       setDay={(day) => setValue(name, day)}
  //       value={watch(name)}
  //       {...elementProps}
  //       {...controllerField}
  //       error={errors?.[name]?.message}
  //     />
  //   );
  // }
  if (props.inputType === "autocomplete") {
    let {options, status, refetch} = props;
    if (status === "loading") return <LoadingState label={label}/>;
    if (status === "error" && refetch) return <ErrorState label={label} refetch={refetch}/>;
    return (
      <Autocomplete
        {...controllerField}
        {...elementProps}
        options={options}
        ref={ref}
        //@ts-ignore
        getOptionLabel={(option) => {
          if (typeof option !== "object") {
            let result = options.find((op) => op?.value === option);
            return result?.title || "";
          }
          return option?.title || "";
        }}
        filterOptions={(ops, state) => {
          //@ts-ignore
          let temp = ops?.filter((op) => op?.title?.includes(state?.inputValue));
          return temp;
        }}
        value={controllerField?.value}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            error={Boolean(errors?.[name]?.message)}
            helperText={errors?.[name]?.message}
            size="small"
          />
        )}
      />
    );
  }

  if (props.inputType === "select") {
    let {options, status, refetch, watch} = props;
    if (status === "loading") return <LoadingState label={label}/>;
    if (status === "error" && refetch) return <ErrorState label={label} refetch={refetch}/>;
    return (
      <FormControl fullWidth>
        <InputLabel id={`select-input-${name}`}>{label}</InputLabel>
        <Select
          labelId={`select-input-${name}`}
          label={label}
          ref={ref}
          {...controllerField}
          {...elementProps}
          {...{...(elementProps.multiple ? {value: (watch(name) ?? [])} : {})}}
          error={Boolean(errors?.[name]?.message)}
          size="small"
        >
          {options?.map((option) => (
            <MenuItem key={`${name}-select-item-${option.value}`} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
        {Boolean(errors?.[name]?.message) && <FormHelperText error={true}>{errors?.[name]?.message}</FormHelperText>}
      </FormControl>
    );
  }
  // if (props.inputType === "city") {
  //   const { setValue, disabled, cityId } = elementProps;
  //   if (!setValue) throw Error("set value not defined");
  //   return <SelectCity label={label} name={name} setValue={setValue} disabled={disabled} cityId={cityId} />;
  // }
  if (props.inputType === "checkbox") {
    const {setValue, disabled = false} = elementProps;
    return (
      <FormGroup>
        <FormControlLabel
          ref={ref}
          control={<Checkbox name={name}
                             size="small"
                             disabled={disabled}
                             checked={props?.value}
                             onChange={setValue}/>}
          label={label}
          {...controllerField}
          {...elementProps}
        />
        {Boolean(errors?.[name]?.message) && <FormHelperText error={true}>{errors?.[name]?.message}</FormHelperText>}
      </FormGroup>
    );
  }
  if (props.inputType === "custom") {
    if (!props.render) throw Error("render item not defined");
    return props.render;
  }

  // if (props.inputType === "location") {
  //   const { setValue, watch } = elementProps;
  //   if (!setValue) throw Error("set value not defined");
  //   if (!watch) throw Error("watch is not defined");
  //   return <SelectLocation watch={watch} setValue={setValue} />;
  // }

  return <h1>not supported type</h1>;
});

RenderFormInput.displayName = "RenderFormInput";

export default RenderFormInput;

// export const LoadingState: React.FC<{ label }> = ({label}) => {
export const LoadingState = ({label}) => {
  return (
    <Box sx={{minHeight: "40px"}}>
      <Typography variant="caption" sx={{mb: 1}}>
        {label}
      </Typography>
      <LinearProgress/>
    </Box>
  );
};
// const ErrorState: React.FC<{ label?: string; refetch: () => void }> = ({label, refetch}) => {
//   return <ErrorHandler onRefetch={refetch} errorText={`خطا در دریاف ${label} ها`}/>;
// };
const ErrorState = ({label, refetch}) => {
  return <ErrorHandler onRefetch={refetch} errorText={`خطا در دریاف ${label} ها`}/>;
};
