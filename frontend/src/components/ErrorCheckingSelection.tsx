import { List, ListItem, Checkbox, Grid } from '@mui/joy';

interface Props {
  checkTritones: boolean;
  setCheckTritones: React.Dispatch<React.SetStateAction<boolean>>;
  showMotion: boolean;
  setShowMotion: React.Dispatch<React.SetStateAction<boolean>>;
}
const ErrorCheckingSelection = ({
  checkTritones,
  setCheckTritones,
  showMotion,
  setShowMotion,
}: Props) => {
  return (
    <List
      variant="outlined"
      orientation="horizontal"
      sx={{ '--List-padding': '8px', '--List-radius': '8px' }}
    >
      <Grid container>
        <Grid>
          <ListItem>
            <Checkbox
              checked={checkTritones}
              label="Check for tritones"
              size="lg"
              onChange={(event) => setCheckTritones(event.target.checked)}
            />
          </ListItem>
        </Grid>
        <Grid>
          <ListItem>
            <Checkbox
              checked={showMotion}
              label="Show motion"
              size="lg"
              onChange={(event) => setShowMotion(event.target.checked)}
            />
          </ListItem>
        </Grid>
      </Grid>
    </List>
  );
};

export default ErrorCheckingSelection;
