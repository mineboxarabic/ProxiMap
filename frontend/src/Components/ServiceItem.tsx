import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useResource from "../Hooks/useResource";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import useGeneral from "../Hooks/useGeneral";
import { Card, CardContent, Stack, alpha, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocationOn, Star, Person } from "@mui/icons-material";

// Styled Components
const ModernServiceCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  overflow: 'visible',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
    background: 'linear-gradient(90deg, transparent 0%, transparent 100%)',
    transition: 'all 0.3s ease-in-out',
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: -8,
  left: 16,
  fontSize: '0.75rem',
  fontWeight: 600,
  height: 24,
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const ServiceItem = ({
  className,
  service,
  setHovered,
  setSelected,
  setSelectedPartner,
  isAsked
}: any) => {
  const theme = useTheme();

  
  
  const [partner, setPartner] = useState(service?.partnerDetails?.[0] || service?.usersDetails?.[0]);
 // const [user, setUser] = useState(service?.userDetails?.[0]);

  const [category, setCategory] = useState(service?.categoryDetails?.[0]);


  const {auth} = useAuth();
  const [isSameUser, setIsSameUser] = useState(false);
  const [color, setColor] = useState<{
    card: string;
    border: string;
    accent: string;
  } | null>(null);


  useEffect(() => {
    setCategory(service?.categoryDetails?.[0]);
    if (isAsked) {
        setIsSameUser(auth?.user?._id === service?.userId);
    }
    else {
        setIsSameUser(auth?.user?._id === service?.partnerId);
    }
  }, [auth, service, isAsked]);

  const getColor = () => {
    if(isAsked){
      return {
        card: alpha(theme.palette.grey[400], 0.1),
        border: alpha(theme.palette.grey[400], 0.2),
        accent: theme.palette.grey[500]
      };
    }
    if (isSameUser) {
      return {
        card: alpha(theme.palette.success.main, 0.1),
        border: alpha(theme.palette.success.main, 0.2),
        accent: theme.palette.success.main
      };
    } else {
      return {
        card: alpha(theme.palette.primary.main, 0.05),
        border: alpha(theme.palette.primary.main, 0.15),
        accent: theme.palette.primary.main
      };
    }
  };


  useEffect(() => {
    const colors = getColor();
    setColor(colors);
  }, [isAsked, isSameUser, service]);

  const cardColors = color || getColor();

  return (
    <ListItem
      className={className}
      key={service._id}
      disablePadding
      onClick={() => {setSelected(service); setSelectedPartner(partner)}}
      sx={{
        marginBottom: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: 'pointer',
      }}
    >
      <ModernServiceCard 
        sx={{ 
          width: "100%",
          maxWidth: 400,
          background: `linear-gradient(135deg, ${cardColors.card} 0%, ${alpha(theme.palette.common.white, 0.8)} 100%)`,
          border: `1px solid ${cardColors.border}`,
          '&::before': {
            background: `linear-gradient(90deg, ${cardColors.accent} 0%, ${alpha(cardColors.accent, 0.6)} 100%)`,
          },
          '&:hover': {
            boxShadow: `0 12px 40px ${alpha(cardColors.accent, 0.2)}`,
          }
        }}
      >
        <StatusChip 
          label={isAsked ? "Asked" : "Offered"}
          sx={{
            bgcolor: cardColors.accent,
            color: theme.palette.common.white,
          }}
        />
        
        <CardContent sx={{ p: 3, pt: 4 }}>
          <Stack spacing={2.5}>
            {/* Service Name */}
            <Typography 
              variant="h6" 
              fontWeight={700}
              sx={{ 
                color: theme.palette.grey[900],
                fontSize: '1.25rem'
              }}
            >
              {service.name}
            </Typography>

            {/* Price and Range */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography 
                  variant="h5" 
                  fontWeight={800}
                  sx={{ 
                    color: cardColors.accent,
                    fontSize: '1.75rem'
                  }}
                >
                  €{service.price}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.grey[600],
                    fontSize: '0.875rem'
                  }}
                >
                  per hour
                </Typography>
              </Box>
              
              {!isAsked && (
                <Box sx={{ textAlign: 'right' }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <LocationOn sx={{ fontSize: 16, color: theme.palette.grey[500] }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.grey[600],
                        fontWeight: 600
                      }}
                    >
                      {service.range}m
                    </Typography>
                  </Stack>
                </Box>
              )}
            </Stack>

            {/* Provider Info */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar 
                alt={partner?.username} 
                src={partner?.profile?.profilePicture}
                sx={{
                  width: 48, 
                  height: 48,
                  border: `2px solid ${alpha(cardColors.accent, 0.2)}`,
                }}
              >
                <Person />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body1" 
                  fontWeight={600}
                  sx={{ color: theme.palette.grey[800] }}
                >
                  @{partner?.username}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Star sx={{ fontSize: 14, color: theme.palette.warning.main }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.grey[600],
                      fontSize: '0.8rem'
                    }}
                  >
                    4.8 rating
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* Category */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Chip 
                label={category?.name || "No category"}
                size="small"
                sx={{
                  bgcolor: alpha(cardColors.accent, 0.1),
                  color: cardColors.accent,
                  fontWeight: 600,
                  border: `1px solid ${alpha(cardColors.accent, 0.2)}`,
                  '&:hover': {
                    bgcolor: alpha(cardColors.accent, 0.15),
                  }
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </ModernServiceCard>
    </ListItem>
  );
};

export default ServiceItem;
