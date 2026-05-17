const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const loginUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getMe = async () => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch user");
  }

  return data;
};

export const getJobs = async (category = "") => {
  const url = category
    ? `${API_URL}/jobs?category=${encodeURIComponent(category)}`
    : `${API_URL}/jobs`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
};

export const getJobById = async (id) => {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }

  return res.json();
};

export const createJob = async (jobData) => {
  const res = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(jobData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create job");
  }

  return data;
};

export const updateJobStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update job");
  }

  return data;
};

export const deleteJob = async (id) => {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete job");
  }

  return data;
};