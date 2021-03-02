import {useForm} from 'react-hook-form';
import './App.css';

// Statisch formulier
// function App() {
//     function onFormSubmit(e) {
//         e.preventDefault();
//         console.log('Submitted!');
//     }
//
//     return (
//         <form onSubmit={onFormSubmit}>
//             <fieldset>
//                 <legend>Gegevens</legend>
//
//                 <label htmlFor="details-name">
//                     Naam:
//                     <input
//                         type="text"
//                         name="name"
//                         id="details-name"
//                     />
//                 </label>
//
//                 <label htmlFor="details-age">
//                     Leeftijd:
//                     <input
//                         type="number"
//                         name="age"
//                         id="details-age"
//                     />
//                 </label>
//             </fieldset>
//
//             <fieldset>
//                 <legend>Jouw review</legend>
//
//                 <label htmlFor="referrer">
//                     Hoe heb je dit recept gevonden?
//                     <select
//                         name="found-through"
//                         id="referrer"
//                     >
//                         <option value="google">Google</option>
//                         <option value="vriend">Vriend</option>
//                         <option value="advertentie">Advertentie</option>
//                         <option value="anders">Anders</option>
//                     </select>
//                 </label>
//
//                 <label htmlFor="recipe-comments">
//                     Opmerkingen:
//                     <textarea
//                         name="comments"
//                         id="recipe-comments"
//                         rows="4"
//                         cols="40"
//                         placeholder="Wat vond je van het recept?"
//                     >
//           </textarea>
//                 </label>
//
//                 <button type="submit">
//                     Versturen
//                 </button>
//             </fieldset>
//         </form>
//     );
// }

// Formulier omgezet met react-hook-form
function App() {
    const {handleSubmit, errors, register, watch} = useForm();
    const selectedReferrer = watch('found-through');

    function onFormSubmit(data) {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <fieldset>
                <legend>Gegevens</legend>

                <label htmlFor="details-name">
                    Naam:
                    <input
                        type="text"
                        name="name"
                        id="details-name"
                        ref={register(
                            {
                                required: true,
                                validate: (value) => value.includes('@'),
                            }
                        )}
                    />
                    {errors.comments && <p>Je mag geen @ gebruiken</p>}
                </label>

                <label htmlFor="details-age">
                    Leeftijd:
                    <input
                        type="number"
                        name="age"
                        id="details-age"
                        ref={register}
                    />
                </label>
            </fieldset>

            <fieldset>
                <legend>Jouw review</legend>

                <label htmlFor="referrer">
                    Hoe heb je dit recept gevonden?
                    <select
                        name="found-through"
                        id="referrer"
                        ref={register}
                    >
                        <option value="google">Google</option>
                        <option value="vriend">Vriend</option>
                        <option value="advertentie">Advertentie</option>
                        <option value="anders">Anders</option>
                    </select>
                </label>
                {selectedReferrer === 'anders' && (
                    <input
                        type="text"
                        name="found-through-anders"
                        ref={register({ required: true })}
                    />
                )}

                <label htmlFor="recipe-comments">
                    Opmerkingen:
                    <textarea
                        name="comments"
                        id="recipe-comments"
                        rows="4"
                        cols="40"
                        placeholder="Wat vond je van het recept?"
                        ref={register(
                            {
                                required: {
                                    value: true,
                                    message: "Dit veld mag niet leeg zijn",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Er mogen maximaal 50 karakters gebruikt worden",
                                },
                            }
                        )}
                    >
                    </textarea>
                    {errors.comments && <p>Je bericht is te lang</p>}
                </label>

                <button type="submit">
                    Versturen
                </button>
            </fieldset>
        </form>
    );
}

export default App;