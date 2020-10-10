import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
// https://www.youtube.com/watch?v=Fbu7z5dXcRs&ab_channel=Rocketseat