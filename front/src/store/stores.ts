import { writable } from "svelte/store";
import { storage } from "../services/localStorage";

export const token = writable(storage.getStorage("token"));
