import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, Star, Mail } from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const [comment, setComment] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() && rating === 0) return;
    
    // Construct mailto link
    const subject = encodeURIComponent(`Avis RestyleAI - ${rating}/5 Étoiles`);
    const bodyContent = `Note: ${rating}/5\n\nCommentaire:\n${comment}\n\n---\nEnvoyé depuis l'application RestyleAI`;
    const body = encodeURIComponent(bodyContent);
    
    // Open email client targeting the specific address
    window.location.href = `mailto:restyleai@assosystem.fr?subject=${subject}&body=${body}`;
    
    // Show success state UI
    setIsSent(true);
    setComment('');
    setRating(0);
  };

  return (
    <section className="w-full max-w-2xl mx-auto mt-16 px-4 mb-12" aria-label="Feedback">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-stone-100 rounded-full text-khaki-600">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-800">Aidez-nous à évoluer</h3>
            <p className="text-stone-500 text-sm">Vos commentaires sont envoyés directement au créateur.</p>
          </div>
        </div>

        {isSent ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
              <CheckCircle size={24} />
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">Email préparé !</h4>
            <p className="text-green-700 text-sm mb-6 max-w-md">
              Votre application de messagerie devrait s'être ouverte pour envoyer l'avis à <strong>restyleai@assosystem.fr</strong>.
            </p>
            <button 
              onClick={() => setIsSent(false)}
              className="text-sm font-medium text-green-700 hover:text-green-800 underline decoration-green-300 underline-offset-4"
            >
              Écrire un autre avis
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Rating */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-stone-700">Notez votre expérience</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star 
                      size={24} 
                      className={`
                        ${(hoverRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}
                        transition-colors duration-200
                      `} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-stone-700 mb-2">
                Vos suggestions d'amélioration
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-khaki-500 focus:border-khaki-500 outline-none resize-none transition-all placeholder:text-stone-400 text-stone-700"
                placeholder="Ex: J'aimerais pouvoir sauvegarder mes créations..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-md
                  ${(!comment.trim() && rating === 0) 
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                    : 'bg-stone-900 text-white hover:bg-stone-800 hover:shadow-lg active:scale-[0.99]'}
                `}
                disabled={!comment.trim() && rating === 0}
              >
                <span>Préparer l'email</span>
                <Mail size={18} />
              </button>
            </div>
            
            <p className="text-xs text-stone-400 text-center">
              Cela ouvrira votre application de messagerie par défaut.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};