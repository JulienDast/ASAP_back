import { createCustomError } from "./custom-error";

export const AuthCustomErrors = {
  INVALID_PASSWORD: createCustomError("Mot de passe invalide", "AUTH_001", 403),
  EMAIL_NOT_FOUND: createCustomError("Email inconnu", "AUTH_002", 404),
  INVALID_REFRESH_TOKEN: createCustomError("Refresh Token invalide ou expiré", "AUTH_003", 401),
};

export const UserCustomErrors = {
  USER_NOT_FOUND: createCustomError("L'utilisateur n'a pas été trouvé", "USER_001", 404),
  INFO_ALREADY_EXISTS: createCustomError("L'email ou la licence sont déjà utilisés par un membre", "USER_002", 409),
  INVALID_STATUS: createCustomError("Le statut que vous souhaitez appliquer n'existe pas", "USER_003", 406)
}

export const AuthGuardErrors = {
  TOKEN_NOT_FOUND: createCustomError("Aucun Token trouvé", "AUTHGUARD_001", 404),
  INVALID_TOKEN: createCustomError("Jeton invalide ou expiré", "AUTHGUARD_002", 401)
}

export const OwnProfileErrors = {
  FORBIDDEN: createCustomError("L'id du payload ne correspond pas à l'id du profil", "OWNPROFILEGUARD_001", 403),
}

export const AdminOrOwnerErrors = {
  FORBIDDEN: createCustomError("L'id du payload ne correspond pas à l'id du profil, ni à celui d'un admin", "ADMINOROWNERGUARD_001", 403),
}

export const RoleErrors = {
  FORBIDDEN: createCustomError("Le rôle de l'utilisateur ne permet pas cette action", "ISADMINGUARD_001", 403),
}

export const StatusErrors = {
  FORBIDDEN: createCustomError("L'utilisateur est banni, il ne peut pas effectuer cette action", "ISBANNEDGUARD_001", 403),
}

export const ArticleCustomErrors = {
  ARTICLE_NOT_FOUND: createCustomError("L'article n'a pas été trouvé", "ARTICLE_001", 404),
}

export const LikeCustomErrors = {
  ALREADY_LIKED: createCustomError("L'article est déjà aimé par l'utilisateur", "LIKE_001", 409),
  LIKE_NOT_FOUND: createCustomError("Aucun like de cet utilisaeur n'a été trouvé pour cet article", "LIKE_002", 404),
}

export const CommentCustomErrors = {
  COMMENT_NOT_FOUND: createCustomError("Commentaire non trouvé", "COMMENT_001", 404),
  FORBIDDEN: createCustomError("L'id du payload ne correspond pas au userId du commentaire", "COMMENT_002", 403),
}

export const TournamentCustomErrors = {
  TOURNAMENT_NOT_FOUND: createCustomError("Le tournoi n'a pas été trouvé", "TOURNAMENT_001", 404),
}

export const ParticipationCustomErrors = {
  USER_ERROR: createCustomError("Utilisateur non trouvé ou sans numéro de licence", "PARTICIPATION_001", 404),
  SAME_USER_PARTNER: createCustomError("Le UserId doit être différent du PartnerId", "PARTICIPATION_007", 401),
  PARTNER_ERROR: createCustomError("Partenaire non trouvé ou sans numéro de licence", "PARTICIPATION_002", 400),
  ALREADY_PARTICIPANT: createCustomError("Le User ou partenaire participe déjà à ce tournoi", "PARTICIPATION_003", 409),
  TOURNAMENT_FULL: createCustomError("Nombre de participants maximum atteint", "PARTICIPATION_004", 403),
  DATE_ERROR: createCustomError("Le tournoi a déjà commencé", "PARTICIPATION_005", 422),
  NO_PARTICIPATION_FOUND: createCustomError("Le user connecté n'a pas de participation sur le tournoi choisi", "PARTICIPATION_006", 409)
}