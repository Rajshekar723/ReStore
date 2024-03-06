
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';


import {  useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';



import agent from '../../app/api/agent';


// TODO remove, this demo shouldn't need to reset the theme.


export default function register() {
 //const [ValidationErrors, setValidationErrors] = useState([]);


  const {register , handleSubmit , setError,formState : {isSubmitting,errors,isValid}} = useForm({
    mode: 'onTouched',
    
  })

  function handleApiErrors(errors: any) {
    if(errors){
      errors.forEach((error: string) => {
        if(error.includes('Password')) {
          setError('password', {message : error})
        }else if(error.includes('Email')) {
          setError('email', {message : error})
          
        }
        else if(error.includes('Username')) {
          setError('username', {message : error})
        }
      });
    }

  }
    
 
  return (
    
      <Container component={Paper} maxWidth="sm"sx = {{display:'flex' ,
       flexDirection: 'column',alignItems:'center',p:4}} >
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(data => agent.Account.register(data)
            .catch(error => handleApiErrors(error)))} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              
              fullWidth

              label="User Name"
              
              autoFocus
                {...register('username',{required:'Username is required'})}
                error={!!errors.username}
                helperText={errors?.username?.message as string}
            />
            <TextField
              margin="normal"
              
              fullWidth

              label="Email"
              
             
                {...register('email',{required:'email is required'})}
                error={!!errors.email}
                helperText={errors?.email?.message as string}
            />
            <TextField
              margin="normal"
       
              fullWidth
              label="Password"
              type="password"
           
              {...register('password',{required: 'Password is required'})}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
        
            <LoadingButton loading = {isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>
              
              <Grid item>
                <Link to='/login' >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
       
      </Container>
   
  );
}


