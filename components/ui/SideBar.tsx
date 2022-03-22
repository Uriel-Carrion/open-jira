import { ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box, Divider, Drawer, List, ListItem } from "@mui/material";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const menuItem: string[] = ["Inbox", "Starred", "Send email", "Drafts"];

export const SideBar = () => {
  return (
    <Drawer
      anchor="left"
      open={false}
      onClose={() => {
        console.log("Cerrrando");
      }}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5x 10px" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>

        <List>
          {menuItem.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <MoveToInboxOutlinedIcon />
                ) : (
                  <EmailOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />
      </Box>
    </Drawer>
  );
};
