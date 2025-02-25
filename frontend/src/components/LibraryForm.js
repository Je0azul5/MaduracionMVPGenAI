import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  Container,
  Grid
} from '@mui/material';
import { createLibrary } from '../services/libraryService';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es obligatorio'),
  address: Yup.string()
    .required('La dirección es obligatoria'),
  phone: Yup.string()
    .matches(/^\+?[\d\s-]+$/, 'Formato de teléfono inválido')
    .required('El teléfono es obligatorio'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  openingHours: Yup.object().shape({
    monday: Yup.string().required('Horario del lunes es obligatorio'),
    tuesday: Yup.string().required('Horario del martes es obligatorio'),
    wednesday: Yup.string().required('Horario del miércoles es obligatorio'),
    thursday: Yup.string().required('Horario del jueves es obligatorio'),
    friday: Yup.string().required('Horario del viernes es obligatorio')
  })
});

const initialValues = {
  name: '',
  address: '',
  phone: '',
  email: '',
  openingHours: {
    monday: '9:00-18:00',
    tuesday: '9:00-18:00',
    wednesday: '9:00-18:00',
    thursday: '9:00-18:00',
    friday: '9:00-18:00'
  }
};

const LibraryForm = () => {
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await createLibrary(values);
      setStatus({
        type: 'success',
        message: 'Biblioteca creada exitosamente'
      });
      resetForm();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registrar Nueva Biblioteca
        </Typography>

        {status.message && (
          <Alert 
            severity={status.type} 
            sx={{ mb: 2 }}
            onClose={() => setStatus({ type: '', message: '' })}
          >
            {status.message}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="name"
                    as={TextField}
                    fullWidth
                    label="Nombre de la Biblioteca"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="address"
                    as={TextField}
                    fullWidth
                    label="Dirección"
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="phone"
                    as={TextField}
                    fullWidth
                    label="Teléfono"
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    label="Email"
                    type="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Horarios de Apertura
                  </Typography>
                </Grid>

                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                  <Grid item xs={12} sm={6} md={4} key={day}>
                    <Field
                      name={`openingHours.${day}`}
                      as={TextField}
                      fullWidth
                      label={day.charAt(0).toUpperCase() + day.slice(1)}
                      error={
                        touched.openingHours?.[day] && 
                        Boolean(errors.openingHours?.[day])
                      }
                      helperText={
                        touched.openingHours?.[day] && 
                        errors.openingHours?.[day]
                      }
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    {isSubmitting ? 'Registrando...' : 'Registrar Biblioteca'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LibraryForm;