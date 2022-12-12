import { useState } from 'react'
import { Box, TextField } from '@mui/material'

const TextInput = (props) => {
  const { name, label, value, type, onChange } = props
  return (
    <Box py={2}>
      <TextField
        name={name}
        label={label}
        type={type}
        value={value}
        variant='outlined'
        onChange={onChange}
        fullWidth
        // required
      />
    </Box>
  )
}
export default TextInput