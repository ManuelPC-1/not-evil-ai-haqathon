import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NavBar() {
  return (
    <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> Not Evil AI HAQATHON 2022
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
  );
}
export default NavBar;