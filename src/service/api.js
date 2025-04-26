import axios from "axios";

const baseUrl = "https://law-lms.onrender.com";
const Token = JSON.parse(localStorage.getItem("loginData"));
// console.log(Token.token);

axios.defaults.headers.common["Authorization"] = `Bearer ${Token?.token}`;

// =================================  Authentication section ========================

// Register
export const AuthRegister = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Login
export const AuthLogin = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth/login`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// logout
export const Logout = async () => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth/logout`);
    localStorage.clear();
    return res.data.message;
  } catch (error) {
    console.log(error);
  }
};

// =================================  Authentication section ========================
//
//
//
//
// =================================  user section ========================
// Get all users
export const GetAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/users`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// =================================  user section ========================
//
//
//
//
// =================================  course section ========================

// Get all courses
export const GetAllCourses = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/courses`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

// Get all courses by id
export const GetCourseById = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/api/courses/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Add new course
export const AddNewCourseApi = async (courseData) => {
  try {
    const res = await axios.post(`${baseUrl}/api/courses`, courseData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
    return (
      error.response?.data?.message || error.message || "Something went wrong."
    );
  }
};

// Update course by id
export const UpdateCourseById = async (courseData, id) => {
  try {
    return null;
  } catch (error) {
    console.log(error);
  }
};

// Delete course by id
export const DeleteCourseById = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/api/courses/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// =================================  course section ========================
//
//
//
//
// =================================  Upload file section ========================
// without type
export const UploadFile = async (file) => {
  try {
    const res = await axios.post(`${baseUrl}/api/upload`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);

    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
// with type
export const UploadFileWithType = async (file) => {
  try {
    const res = await axios.post(
      `https://z-backend-2xag.onrender.com/api/upload/type`,
      file,
      {
        // const res = await axios.post(`${baseUrl}/api/upload/type`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data);

    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    return error?.response?.data?.message || error.message || "Upload failed";
  }
};
// =================================  Upload file section ========================

// =================================  Upload file section ========================
//
//
//
//
// =================================  forum section ========================

// Get all forum posts
export const addFormPost = async (post) => {
  try {
    const res = await axios.post(`${baseUrl}/api/forum`, post, {
      headers: 'Content-Type": "multipart/form-data',
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// get all post
export const getAllFormPost = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/forum`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// get post by id
export const getFormPost = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/api/forum/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// edit post
export const editFormPost = async (id, post) => {
  try {
    const res = await axios.post(`${baseUrl}/api/forum/${id}`, post, {
      headers: 'Content-Type": "multipart/form-data',
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// post comment
export const addFormPostComment = async (id, payload) => {
  try {
    const res = await axios.post(`${baseUrl}/api/forum/${id}`, payload, {
      headers: 'Content-Type": "multipart/form-data',
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// comment replay
export const addFormCommentReplay = async (postId, commentId, payload) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/forum/${postId}/replay/${commentId}`,
      payload,
      {
        headers: 'Content-Type": "multipart/form-data',
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// =================================  forum section ========================
