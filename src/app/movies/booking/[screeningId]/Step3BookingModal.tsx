"use client";
import React from "react";
import Image from "next/image";
import { Box, Stack, Typography, Alert, Divider } from "@mui/material";
import {
  Step3BookingModalProps,
  PaymentOptionProps,
} from "./types/BookingModalTypes";

export default function Step3BookingModal({
  totalPrice,
  selectedMethod,
  onSelectMethod,
  error,
}: Step3BookingModalProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6" component="h3">
        Select payment method
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack spacing={2}>
        <PaymentOption
          id="card"
          title="Credit/Debit Card"
          description="Pay securely with your card"
          isSelected={selectedMethod === "card"}
          onSelect={() => onSelectMethod("card")}
          icon={
            <Image
              src="/mastercard.svg"
              alt="…"
              width={28}
              height={28}
              style={{ width: "32px", height: "auto" }}
            />
          }
        />
        <PaymentOption
          id="swish"
          title="Swish"
          description="Pay with swish mobile payment"
          isSelected={selectedMethod === "swish"}
          onSelect={() => onSelectMethod("swish")}
          icon={
            <Image
              src="/swish-logo.png"
              alt="Swish"
              width={28}
              height={28}
              style={{ width: "32px", height: "auto" }}
            />
          }
        />
        <PaymentOption
          id="atCinema"
          title="Pay at cinema"
          description="Pay when you arrive at the cinema"
          isSelected={selectedMethod === "atCinema"}
          onSelect={() => onSelectMethod("atCinema")}
          icon={
            <Image
              src="/kinoLogo.png"
              alt="Pay at cinema"
              width={28}
              height={28}
              style={{ width: "32px", height: "auto" }}
            />
          }
        />
      </Stack>

      <Divider />
      <Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography fontWeight="bold">Total:</Typography>
          <Typography>{totalPrice} kr</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          *This is a simulated payment for demonstration purposes*
        </Typography>
      </Box>
    </Stack>
  );
}

function PaymentOption({
  id,
  title,
  description,
  isSelected,
  onSelect,
  icon,
}: PaymentOptionProps) {
  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        border: 1,
        borderColor: isSelected ? "primary.main" : "divider",
        borderRadius: 1,
        bgcolor: isSelected ? "background.paper" : "transparent",
        cursor: "pointer",
        "&:hover": {
          bgcolor: isSelected ? "background.paper" : "action.hover",
        },
      }}
    >
      <Box component="span">{icon}</Box>
      <Box flex="1">
        <Typography fontWeight={500}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <input
        type="radio"
        id={id}
        name="paymentMethod"
        checked={isSelected}
        onChange={onSelect}
        style={{ display: "none" }}
      />
    </Box>
  );
}
