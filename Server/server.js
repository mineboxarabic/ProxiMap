import application from './Application.js';

const PORT = process.env.PORT || 3001;
application.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
