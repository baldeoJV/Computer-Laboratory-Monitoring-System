
import {create} from 'zustand'

const useStore = create((set) => ({
    adminDetails: {admin_id: '', first_name: '', last_name: ''},
    setadminDetails: (ad) => set({adminDetails: {admin_id: ad.admin_id, first_name: ad.first_name, last_name: ad.last_name}}),
    // ITABLE
    order: 'asc',
    setOrder: (o) => set({order: o}),

    orderBy: '',
    setOrderBy: (p) => set({orderBy: p}),

    selected: [],
    setSelected: (newSelected) => set({selected: newSelected}),

    page:0,
    setPage: (newPage) => set({page: newPage}),

    rowsPerPage: 10,
    setRowsPerPage: (rpp) => set({rowsPerPage: rpp}),

    anchorEl: null,
    setAnchorEl: (ct) => set({anchorEl: ct}), //current target

    menuRow: null,
    setMenuRow: (r) => set({menuRow: r}),

    tableType: '',
    setTableType: (t) => set({type: t}),

    reportedBuilding: '',
    setReportedBuilding: (rb) => set({reportedBuilding: rb}),

    reportedPcID: null,
    setReportedPcID: (id) => set({reportedPcID:id}),

    reportedRoom:null,
    setReportedRoom: (r) =>set({reportedRoom: r}),

    targetedRooms:[], 
    setTargetedRooms: (tr) => set({targetedRooms:tr}),

    targetedComputerIDs:[], 
    setTargetedComputerIDs: (tc) => set({targetedComputerIDs:tc}),

    // to show ui before logging in or not
    showUi: true,
    setShowUi: (su) => set({showUi: su}),

    errorMessage: "",
    setErrorMessage: (em) => set({errorMessage: em}),

    errorStatus: 0,
    setErrorStatus: (es) => set({errorStatus: es}),


}))

export default useStore