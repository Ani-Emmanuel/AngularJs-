import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/index";

import { environment } from "../../environments/environment";
import {
  Accident,
  ApiResponse,
  Assignment,
  Maintenance,
  Offence,
  PmlWaybill,
  PmtWaybill,
  Rating,
  Schedule,
  Spares,
  Staff,
  Terminal,
  Vehicle
} from "../_models";
import { UtilsService } from "./utils.service";

const token = localStorage.getItem("token");

const httpOptions = {
  headers: new HttpHeaders({
    "content-type": "application/json",
    Authorization: `Bearer ${token}`
  })
};

@Injectable({ providedIn: "root" })
export class ApiService {
  apiUrl = environment.PEACE_API;
  constructor(private http: HttpClient, private utilsService: UtilsService) {}

  getAccident(query = "") {
    return this.http.get<ApiResponse>(`${this.apiUrl}/accidents${query}`);
  }

  getAssignment(query = "") {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/vehicle-assignments${query}`
    );
  }
  getMaintenance(query = "") {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/pmt-maintenances${query}`
    );
  }

  getSettings(query = "") {
    return this.http.get<ApiResponse>(`${this.apiUrl}/settings/public${query}`);
  }

  updateSetting(id: string, payload: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/settings/${id}`,
      payload,
      httpOptions
    );
  }

  retrieveSettings(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${
        this.apiUrl
      }/settings/public?fields=name,value,category,description&_id=${id}`
    );
  }

  getSetting(settings, id): Terminal {
    return settings.filter(obj => obj.id === id);
  }

  getNotification(query = "") {
    return this.http.get<ApiResponse>(`${this.apiUrl}/notifications${query}`);
  }

  postNotification(payload) {
    return this.http.post<ApiResponse>(
      `${this.apiUrl}/notifications`,
      payload,
      httpOptions
    );
  }

  deleteNotification(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${this.apiUrl}/notifications/${id}`,
      httpOptions
    );
  }

  updateNotification(id, payload) {
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/notifications/${id}`,
      payload,
      httpOptions
    );
  }

  getOffence(query = "") {
    return this.http.get<ApiResponse>(`${this.apiUrl}/offences${query}`);
  }
  getPmlWaybill(query = "") {
    return this.http.get<ApiResponse>(`${this.apiUrl}/pml-waybills${query}`);
  }

  postPmtWaybill(waybill: any) {
    return this.http.post<ApiResponse>(
      `${this.apiUrl}/pmt-waybills`,
      waybill,
      httpOptions
    );
  }

  updatePmtWaybill(payload, id) {
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/pmt-waybills/${id}`,
      payload,
      httpOptions
    );
  }

  deletePmtWaybill(id) {
    return this.http.delete<ApiResponse>(
      `${this.apiUrl}/pmt-waybills/${id}`,
      httpOptions
    );
  }
  getPmtWaybill(query = "") {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/pmt-waybills${query}`,
      httpOptions
    );
  }
  getRating(query = "") {
    return this.http.get<ApiResponse>(`${this.apiUrl}/ratings${query}`);
  }

  getSchedule(query = "") {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/pmt-schedules${query}`,
      httpOptions
    );
  }
  getSpares(query = "") {
    return this.http.get<ApiResponse>(`${this.apiUrl}/spares${query}`);
  }

  getStaff(query = "") {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/staff${query}`,
      httpOptions
    );
  }

  getDriver(query = "") {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/drivers${query}`,
      httpOptions
    );
  }

  getCostumer(query = "") {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/customers${query}`,
      httpOptions
    );
  }

  getVehicleOwner(query = "") {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/vehicle-owners${query}`,
      httpOptions
    );
  }

  // Terminal
  retrieveTerminal(query = ""): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/terminals${query}`);
  }

  updateTerminal(terminal: Terminal): Observable<ApiResponse> {
    const id = terminal.id;
    delete terminal.id;
    const payload = this.utilsService.cleanObject(terminal);
    return this.http.put<ApiResponse>(
      `${this.apiUrl}/terminals/${id}`,
      payload
    );
  }

  createTerminal(terminal: Terminal): Observable<ApiResponse> {
    delete terminal.id;
    const payload = this.utilsService.cleanObject(terminal);
    return this.http.post<ApiResponse>(`${this.apiUrl}/terminals`, payload);
  }

  deleteTerminal(id: Terminal["id"]): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/terminals/${id}`);
  }

  getTerminal(terminals, id): Terminal {
    return terminals.filter(obj => obj.id === id);
  }

  // Vehicle
  getVehicle(query = ""): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/vehicles${query}`);
  }

  // City, County, State
  retrieveCity(query = ""): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/cities${query}`);
  }
  retrieveCounty(query = ""): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/counties${query}`);
  }
  retrieveState(query = ""): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/states${query}`);
  }
}
