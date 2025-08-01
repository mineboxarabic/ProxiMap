import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
  CircleMarker,
} from "react-leaflet";
import { Box } from "@mui/system";
import { 
  useTheme, 
  alpha, 
  styled, 
  keyframes 
} from "@mui/material/styles";
import {
  Button,
  CircularProgress,
  Typography,
  Paper,
  Fade,
  Slide,
  IconButton,
  Collapse,
  Chip,
  Stack
} from "@mui/material";
import {
  FilterList,
  Close as CloseIcon,
  MyLocation,
  Layers
} from "@mui/icons-material";
import "leaflet/dist/leaflet.css";
import useResource from "../Hooks/useResource";
import { useEffect, useState } from "react";


import L from "leaflet";
import "../Style/Map.scss";
import MapEvents from "../Helpers/MapEvents";
import useInMapView from "../Hooks/Services/useInMapView";
import ServiceList from "../Components/ServiceList";
import ServiceDetailsDrawer from "../Components/ServiceDetailsDrawer";
import MapSearchBar from "../Components/MapSearchBar";
import { Alert } from "@mui/material";
import useCurrentUser from "../Hooks/useCurrentUser";
import MarkerService from "../Components/Map/MarkerService";
import Container from "@mui/material/Container";
import useGeneral from "../Hooks/useGeneral";
import ServiceFilterNew from "../Components/ServiceFilterNew";

// Animations
const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const MapContainer_Styled = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.default, 1)} 0%, 
    ${alpha(theme.palette.primary.main, 0.02)} 25%, 
    ${alpha(theme.palette.secondary.main, 0.01)} 50%, 
    ${alpha(theme.palette.primary.main, 0.03)} 75%, 
    ${alpha(theme.palette.background.default, 1)} 100%)`,
  minHeight: '100vh',
  paddingTop: '80px', // Add padding to account for fixed navbar
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23329FB2' fill-opacity='0.01'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
}));

const ModernCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.spacing(3),
  transition: 'all 0.3s ease-in-out',
  animation: `${slideInUp} 0.6s ease-out`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

const FloatingActionButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
  border: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
  transition: 'all 0.3s ease-in-out',
  animation: `${float} 3s ease-in-out infinite`,
  '&:hover': {
    transform: 'scale(1.1) translateY(-2px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
  },
}));

const FilterToggleButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1200,
  background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  borderRadius: theme.spacing(3),
  color: theme.palette.primary.main,
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  minWidth: 'auto',
  transition: 'all 0.3s ease-in-out',
  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const FilterPanel = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.common.white, 0.98)} 0%, 
    ${alpha(theme.palette.primary.main, 0.02)} 50%,
    ${alpha(theme.palette.secondary.main, 0.01)} 100%)`,
  backdropFilter: 'blur(30px)',
  border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  borderRadius: theme.spacing(4),
  boxShadow: `
    0 20px 60px ${alpha(theme.palette.primary.main, 0.15)},
    0 8px 32px ${alpha(theme.palette.common.black, 0.1)},
    inset 0 1px 0 ${alpha(theme.palette.common.white, 0.9)}
  `,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  animation: `${slideInUp} 0.5s ease-out`,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.spacing(4),
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.primary.main, 0.02)} 0%, 
      transparent 50%, 
      ${alpha(theme.palette.secondary.main, 0.01)} 100%)`,
    zIndex: -1,
  },
}));

const Map = () => {
  const theme = useTheme();
  const {
    services,
    isLoadingServices,
    updateBounds: updateServiceBounds,
    errorServices,
  } = useInMapView(false);
  const {
    services: askedServices,
    isLoadingServices: isLoadingAskedServices,
    updateBounds: updateAskedBounds,
    errorServices: errorAskedServices,
  } = useInMapView(true);

  // @ts-expect-error TS(2339): Property 'oVServices' does not exist on type '{}'.
  const { oVServices, setOVServices, oVAskedServices, setOVAskedServices } =
    useGeneral();
  
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [position, setPosition] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [height, setHeight] = useState("85vh");
  const [showFilters, setShowFilters] = useState(false);
  const [mapStyle, setMapStyle] = useState('default');
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  //This function is to close the drawer
  const onCloseDrawer = () => {
    setSelected(null);
  };

  const updateBounds = (bounds: any) => {
    updateServiceBounds(bounds);
    updateAskedBounds(bounds);
  };

  const currentUser = useCurrentUser();
  //When we search we execute this function
  const onSearchSubmit = (value: any) => {
    const lat = value.lat;
    const lng = value.lng;


    // @ts-expect-error TS(2345): Argument of type '{ lat: any; lng: any; }' is not ... Remove this comment to see the full error message
    setPosition({ lat, lng });
  };

  useEffect(() => {
    console.log("services", services.length);
  }, [services]);

  useEffect(() => {
    if (selected) {
      setIsDrawerOpened(true);
    } else {
      setIsDrawerOpened(false);
    }
  }, [selected]);

  const onFilterChange = (filter: any) => {
    // Handle filter changes here
    console.log('Filter changed:', filter);
    // Update active filter count
    const activeFilters = Object.values(filter).filter(value => 
      value !== '' && value !== false && value !== 0 && 
      (Array.isArray(value) ? value[0] !== 0 || value[1] !== 10 : true)
    ).length;
    setActiveFilterCount(activeFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // @ts-expect-error TS(2345): Argument of type '{ lat: number; lng: number; }' is not assignable
          setPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const getTileLayerConfig = () => {
    switch (mapStyle) {
      case 'satellite':
        return {
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
        };
      case 'minimal':
        return {
          url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        };
      default:
        return {
          url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        };
    }
  };

  return (
    <MapContainer_Styled>
      {/* Filter Toggle Button */}
      <FilterToggleButton
        onClick={toggleFilters}
        startIcon={showFilters ? <CloseIcon /> : <FilterList />}
        endIcon={activeFilterCount > 0 && (
          <Chip 
            label={activeFilterCount} 
            size="small" 
            sx={{ 
              backgroundColor: theme.palette.secondary.main,
              color: 'white',
              minWidth: '24px',
              height: '20px',
              '& .MuiChip-label': {
                fontSize: '0.75rem',
                padding: '0 6px',
              }
            }} 
          />
        )}
      >
        {showFilters ? 'Close' : 'Filters'}
      </FilterToggleButton>

      {/* Collapsible Filter Panel */}
      <Collapse in={showFilters} timeout={400}>
        <Box
          sx={{
            position: 'absolute',
            top: theme.spacing(8),
            right: theme.spacing(2),
            zIndex: 1200,
            width: { xs: 'calc(100% - 32px)', sm: '420px' },
            maxWidth: '500px',
          }}
        >
          <FilterPanel elevation={0} sx={{ p: 4, position: 'relative' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 3 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList sx={{ color: theme.palette.primary.main }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    fontSize: '1.3rem'
                  }}
                >
                  Filter Services
                </Typography>
              </Box>
              <Chip
                label="Advanced"
                size="small"
                variant="outlined"
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  background: alpha(theme.palette.primary.main, 0.05),
                }}
              />
            </Box>
            
            <Box sx={{ 
              background: alpha(theme.palette.grey[50], 0.8),
              borderRadius: theme.spacing(2),
              p: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            }}>
              <ServiceFilterNew onFilterChange={onFilterChange} />
            </Box>
            
            {/* Filter Actions */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              justifyContent: 'flex-end',
              mt: 3,
              pt: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`
            }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: alpha(theme.palette.text.secondary, 0.3),
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    borderColor: theme.palette.text.secondary,
                    background: alpha(theme.palette.text.secondary, 0.05),
                  }
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                  }
                }}
              >
                Apply Filters
              </Button>
            </Box>
          </FilterPanel>
        </Box>
      </Collapse>

      <ServiceDetailsDrawer
        partner={selectedPartner}
        service={selected}
        open={isDrawerOpened}
        onClose={onCloseDrawer}
      />

      <Container maxWidth="xl" sx={{ py: 3, position: 'relative', zIndex: 1 }}>
        <ModernCard
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            height: { xs: "calc(100vh - 200px)", md: "85vh" },
            overflow: "hidden",
            p: 2,
            gap: 2,
          }}
        >
          {/* Map Section */}
          <Box
            sx={{
              width: { xs: "100%", md: "70%" },
              height: { xs: "60%", md: "100%" },
              position: "relative",
              borderRadius: theme.spacing(2),
              overflow: "hidden",
              boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <MapContainer
              center={
                position
                  // @ts-expect-error TS(2339): Property 'lat' does not exist on type 'never'.
                  ? [position.lat, position.lng]
                  : [43.67248611471893, 4.632794385153891]
              }
              zoom={12}
              minZoom={6}
              maxZoom={18}
              scrollWheelZoom={true}
              id="mapid"
              style={{
                height: "100%",
                width: "100%",
                borderRadius: theme.spacing(2),
              }}
            >
              <TileLayer {...getTileLayerConfig()} />
              
              {/* Modern Search Bar */}
              <Box
                sx={{
                  position: "absolute",
                  top: theme.spacing(2),
                  left: theme.spacing(2),
                  zIndex: 1000,
                  animation: `${slideInUp} 0.8s ease-out`,
                }}
              >
                <MapSearchBar onSearchSubmit={onSearchSubmit} />
              </Box>

              {/* Floating Action Buttons */}
              <FloatingActionButton
                onClick={handleLocationClick}
                sx={{
                  bottom: theme.spacing(12),
                  right: theme.spacing(2),
                  zIndex: 1000,
                }}
                size="large"
              >
                <MyLocation />
              </FloatingActionButton>

              <FloatingActionButton
                onClick={() => setMapStyle(mapStyle === 'default' ? 'satellite' : mapStyle === 'satellite' ? 'minimal' : 'default')}
                sx={{
                  bottom: theme.spacing(2),
                  right: theme.spacing(2),
                  zIndex: 1000,
                }}
                size="large"
              >
                <Layers />
              </FloatingActionButton>

              {/* Error Displays */}
              {errorServices && (
                <Fade in={true}>
                  <Box 
                    className={"error-container"}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1001,
                      maxWidth: "80%",
                    }}
                  >
                    <Alert
                      severity="error"
                      sx={{
                        borderRadius: theme.spacing(2),
                        backdropFilter: 'blur(20px)',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.95)} 0%, ${alpha(theme.palette.error.dark, 0.9)} 100%)`,
                        color: 'white',
                        boxShadow: `0 8px 32px ${alpha(theme.palette.error.main, 0.3)}`,
                      }}
                    >
                      {errorServices}
                    </Alert>
                  </Box>
                </Fade>
              )}

              {errorAskedServices && (
                <Fade in={true}>
                  <Box 
                    className={"error-container"}
                    sx={{
                      position: "absolute",
                      top: "60%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1001,
                      maxWidth: "80%",
                    }}
                  >
                    <Alert
                      severity="error"
                      sx={{
                        borderRadius: theme.spacing(2),
                        backdropFilter: 'blur(20px)',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.95)} 0%, ${alpha(theme.palette.error.dark, 0.9)} 100%)`,
                        color: 'white',
                        boxShadow: `0 8px 32px ${alpha(theme.palette.error.main, 0.3)}`,
                      }}
                    >
                      {errorAskedServices}
                    </Alert>
                  </Box>
                </Fade>
              )}

              {/* Loading States */}
              {(!oVServices || oVServices.length === 0) && (
                <Fade in={true}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "40%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1000,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: theme.spacing(2),
                    }}
                  >
                    <ModernCard sx={{ p: 3, textAlign: 'center' }}>
                      <CircularProgress 
                        size={48} 
                        sx={{ 
                          color: theme.palette.primary.main,
                          mb: 2 
                        }} 
                      />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          mb: 1
                        }}
                      >
                        Loading Services
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: theme.palette.text.secondary,
                        }}
                      >
                        Finding nearby services for you...
                      </Typography>
                    </ModernCard>
                  </Box>
                </Fade>
              )}

              {/* Service Markers */}
              {oVServices?.length > 0 && 
                oVServices.map((service: any, index: any) => (
                  <MarkerService key={`service-${index}`} service={service} isAsked={false} />
                ))
              }

              {oVAskedServices?.length > 0 && 
                oVAskedServices.map((service: any, index: any) => (
                  <MarkerService key={`asked-service-${index}`} service={service} isAsked={true} />
                ))
              }

              <MapEvents
                position={position}
                setBounds={updateBounds}
                setPosition={setPosition}
              />
            </MapContainer>

            {/* Map Style Indicator */}
            <Box
              sx={{
                position: "absolute",
                bottom: theme.spacing(2),
                left: theme.spacing(2),
                zIndex: 1000,
              }}
            >
              <Chip
                label={`${mapStyle.charAt(0).toUpperCase() + mapStyle.slice(1)} View`}
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>

          {/* Service List Section */}
          <Box
            sx={{
              width: { xs: "100%", md: "30%" },
              height: { xs: "40%", md: "100%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
                borderRadius: theme.spacing(2),
                p: 2,
                mb: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    flex: 1,
                  }}
                >
                  Nearby Services
                </Typography>
                <Chip
                  label={`${(oVServices?.length || 0) + (oVAskedServices?.length || 0)} found`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>
            </Box>
            
            <Box
              sx={{
                flex: 1,
                overflow: "hidden",
                borderRadius: theme.spacing(2),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.7)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <ServiceList
                setSelectedPartner={setSelectedPartner}
                onCloseDrawer={onCloseDrawer}
                setSelected={setSelected}
                setHovered={setHovered}
              />
            </Box>
          </Box>
        </ModernCard>
      </Container>
    </MapContainer_Styled>
  );
};

export default Map;
