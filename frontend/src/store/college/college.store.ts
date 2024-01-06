import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getUniversities } from "../../api/university.api";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

type CollegeState = {
    colleges: any[];
    selectedColleges: any[];
    userScore: any;
    form: any;
}

type Actions = {
    fetchUniversities: () => any;
    addCollege: (college: any) => any;
    setSelectedCollege: (colleges: any[]) => any;
    removeCollege: (college: any) => any;
    setForm: (form: any) => any;
    reset: () => void;
}

const persistStorage: StateStorage = localStorage;

const storageOptions = {
    name: 'colleges.store',
    storage: createJSONStorage(() => persistStorage),
    partialize: (state: CollegeState & Actions) => ({
        // selectedColleges: state.selectedColleges,
        userScore: state.userScore,
        form: state.form
    })

}


const initialState: CollegeState = {
    colleges: [],
    selectedColleges: [],
    userScore: {
        success: 0,
        value: 0,
        cost: 0,
        outcomes: 0,
        diversity: 0
    },
    form: {}
}

const useCollegeStore = create<CollegeState & Actions>()(
    persist(
        immer((set) => ({
            ...initialState,
            fetchUniversities: async () => {
                const response = await getUniversities();

                if (response) {
                    console.log('[fetchUniversities] response', response);
                    return set(() => ({ colleges: response }));
                }
            },
            addCollege: (college: any) => {
                return set((state) => ({ selectedColleges: [...state.selectedColleges, college] }));
            },
            removeCollege: (college: any) => {
                return set((state) => ({ selectedColleges: [...state.colleges.map((col) => col.instnm !== college.instnm)] }));
            },
            setSelectedCollege: (colleges: any[]) => {
                return set((state) => ({ selectedColleges: colleges }));
            },
            setForm: (form: any) => set((state) => ({ form: { ...state.form, ...form } })),
            reset: () => {
                set(initialState);
            }
        })),
        storageOptions
    )

)

export default useCollegeStore;