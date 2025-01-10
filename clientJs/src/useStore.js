
import {create} from 'zustand'

const useStore = create((set) => ({
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

}))

export default useStore