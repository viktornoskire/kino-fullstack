"use client";

import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { Step1BookingModalProps } from "./types/BookingModalTypes";

export default function Step1BookingModal({
  movieTitle,
  screeningTime,
  seats,
  totalPrice,
  ticketSummary,
  formatScreeningTime,
}: Step1BookingModalProps) {
  const ticketItems = ticketSummary
    ? ticketSummary
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: "background.paper" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            Movie
          </Typography>
          <Typography fontWeight={500}>{movieTitle}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            Date &amp; Time
          </Typography>
          <Typography>{formatScreeningTime(screeningTime)}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Tickets
          </Typography>
          <Stack spacing={0.5} sx={{ textAlign: "right" }}>
            {ticketItems.map((item, i) => (
              <Typography key={i}>{item}</Typography>
            ))}
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 2, borderColor: "divider" }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Seats
          </Typography>
          <Stack spacing={0.5} sx={{ textAlign: "right" }}>
            {seats.map((seat) => (
              <Typography key={seat}>{seat}</Typography>
            ))}
          </Stack>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Total
          </Typography>
          <Typography fontWeight={600}>{totalPrice} SEK</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
