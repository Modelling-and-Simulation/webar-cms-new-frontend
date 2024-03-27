import { FILES_URL } from 'src/constants';

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({ inputData, comparator, filterName, filterBy }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (data) => data[`${filterBy}`].toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}

const loadImage = async (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });

export const generateMindFile = async (compiler, files) => {
  const images = [];
  console.log('files', files);
  for (let i = 0; i < files.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    images.push(await loadImage(files[i]));
  }
  console.log('images', images);
  const _start = new Date().getTime();
  const dataList = await compiler.compileImageTargets(images, (progress) => {
    console.log('progress', progress);
  });
  console.log('exec time compile: ', new Date().getTime() - _start);
  for (let i = 0; i < dataList.length; i += 1) {
    console.log('datalist', dataList[i]);
  }
  const exportedBuffer = await compiler.exportData();

  // Create a file from the exported buffer
  const blob = new Blob([exportedBuffer]);
  const mindFile = new File([blob], 'mindFile.mind', {
    type: 'application/octet-stream',
  });
  return mindFile;
};

export const downloadImages = async (urls) => {
  const images = [];

  const fetchPromise = urls.map(async (url) => {
    const res = await fetch(`${FILES_URL}/${url}`);
    const contentType = res.headers.get('content-type');
    const blob = await res.blob();
    const file = new File([blob], url.split('/').pop(), {
      type: contentType,
    });
    images.push(file);
  });

  await Promise.all(fetchPromise)
    .then(() => {
      console.log('All images downloaded');
    })
    .catch((err) => {
      console.log('Error downloading images', err);
    });

  return images;
};
